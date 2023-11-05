const Product = require('../../models/Product')
const User = require('../../models/User')
const UserImage = require('../../models/UserImage')
const { promises, rm, rmSync } = require('fs')
const { mkdirp } = require('mkdirp')
// const gm = require('gm')
// const im = gm.subClass({ imageMagick: true })

const imagePath = process.env.IMAGE_PATH || require('../../config').IMAGE_PATH
console.log('imagePath', imagePath)

const getImageIdFromFilename = async (req, res) => {
    const { name } = req.params
    const image = await UserImage
        .find({ filename: name })

    console.log('got image from filename', name)

    return res.status(200).json({ image })
}

const getImagesByUserId = async (req, res) => {
    
    const images = await UserImage
        .find({ user: req.params.id })
        .populate('user', 'username')

    return res.status(200).json({ images })
}

const getProfileImageByUserId = async (req, res) => {
    
    const user = await User
        .findOne({ _id: req.params.id })
        .populate('profileImage', 'filename')

    return res.status(200).json(user)
}

const getImageWithUsernameByImageId = async (req, res) => {
    console.log('getting image data and username by id', req.params.id)
    const image = await UserImage
        .findOne({ _id: req.params.id })
        .populate('user', 'username')
    
    if (!image) {
        console.log('could not fetch image data.')
        return res.status(200).json(null)
    }
    
    const { _id, filename, user } = image
    
    const data = { _id, filename, user }
    
    return res.status(200).json(data)
}

const updateProfileImage = async (req, res) => {
    const { userId, imageId } = req.body
    
    const user = await User
        .findOneAndUpdate({ _id: userId }, { $set: { profileImage: imageId } }, { new: true })
        .populate('profileImage', 'filename')

    if (!user) {
        console.log('Error: could not find user while updating avatar')
        return res.status(200).json(null)
    }
    
    return res.status(200).json(user.profileImage)
}

const removeImage = path => rm(path, () => console.log('removed file at path', path))

const removeAllImagesFilesByUsername = async username => await rmSync(
    `${imagePath}/${username}`,
    {
        recursive: true,
        force: true ,
    }
)

const removeImageAndThumb = async (filename, path) => {
    try {
        rm(`${path}/${filename}`, () => console.log('removed image:', `${path}/${filename}`))
    } catch (err) {
        console.log('Error deleting image')
        return null
    }
    try {
        rm(`${path}/thumb/${filename}`, () => console.log('removed thumb:', `${path}/thumb/${filename}`))
    } catch (err) {
        console.log('Error deleting thumb')
        return null
    }

    return true
}

const uploadAvatar = async (req, res) => {
    const { _id, avatar, timestamp } = req.body
    const user = await User.findOne({ _id })

    const path = `${imagePath}/${user.username}`

    console.log('\nwriting avatar to path', path)
    const avatarname = await handleFileUpload(avatar, path, timestamp)
    console.log(`avatar written: ${path}/${avatarname}`)
    console.log('avatarname', avatarname)

    if (!avatarname) {
        console.log('\nError: Cannot write avatar to path.')
        return res.status(400).json({ error: 'Error writing avatar to path.' })
    }

    const newImage = new UserImage({
        user: user._id,
        filename: avatarname,
    })


    await newImage.save()
    
    console.log('newImage', newImage)

    const updatedUser = await User.
        findOneAndUpdate({ _id: user._id }, { $set: {
            profileImage: user.profileImage ? user.profileImage : newImage._id,
            images: [
                ...user.images,
                newImage._id
            ],
        } }, { new: true })
        .populate('profileImage', 'filename')
        .populate({
            path: 'images',
            select: 'filename',
            // populate: { path: 'images' },
        })

    if (!updatedUser) {
        console.log('Could not update user images/profileImage')
        return res.status(200).json(null)
    }
    console.log('updatedUser', updatedUser)

    const { images, profileImage } = updatedUser
    
    return res.status(200).json({ images, profileImage, imageId: newImage._id })
}

const deleteImageById = async (req, res) => {
    const { imageId, isProductImage, isProfileImage } = req.body
    console.log('deleteImageById:', imageId)

    // remove the image from the user images
    console.log('\n removing image by id:', imageId)
    const removedImageId = await removeImageFromUserImages(imageId)
    console.log('\n removedImageId', removedImageId)
    if (!removedImageId) {
        // stop here.
        console.log('Could not find image in user.images to remove.')
        return null
    }
    console.log('image removed from user images.')
    
    // check to see if it is a product image
    if (isProductImage) {
        const productImage = await findAndRemoveImageFromProduct(imageId)
        if (!productImage) {
            // stop here.
            console.log('error removing product image.')
            return null
        }
        console.log('image removed from user product.')
    }

    // remove profile image reference to image

    if (isProfileImage) {
        const profileImage = await clearUserProfileImage(imageId)
        if (!profileImage) {
            console.log('error clearing profile image reference to image.')
            return null
        }
        console.log('profile image reference removed from user.')
    }

    // then we can delete the user image model and delete the files
    
    const deletedImage = await UserImage
        .findOneAndRemove({ _id: imageId })
        // .populate({
            // path: 'user',
            // select: '_id',
            // populate: { path: 'images' },
        // })
    
    console.log('deleted image:', deletedImage)

    if (!deletedImage) console.log('Could not find image to delete')
    
    const user = await User
        .findOne({ _id: deletedImage.user })
    
    console.log('user fetched for image and profile update', user)

    if (!user) {
        console.log('could not find user to update after image deletion.')
        return res.status(200).json(null)
    }

    const userPath = `${imagePath}/${user.username}`
    const filenameToDelete = deletedImage.filename

    const pathToThumb = `${userPath}/thumb/${filenameToDelete}`
    const pathToAvatar = `${userPath}/${filenameToDelete}`

    if (user.images) user.images = user.images.filter(id => id !== imageId)
    if (user.profileImage === imageId) user.profileImage = null
    await user.save()

    const product = await Product
        .findOne({ imageId })
    
    if (product) {
        product.imageId = null
        await product.save()
    }

    removeImage(pathToAvatar)
    removeImage(pathToThumb)

    return res.status(200).json({ id: deletedImage._id })
}

const clearUserProfileImage = async imageId => {
    const user = await getUserFromImageId(imageId)
    if (user.profileImage === imageId) {
        user.profileImage = null
        await user.save()
    }
    return imageId
}

const findAndRemoveImageFromProduct = async imageId => {

    const user = await getUserFromImageId(imageId)
    if (user && user.products) {
        let productFound = false
        const products = user.products.map(product => {
            if (product.imageId === imageId) {
                productFound = true
                return {
                    ...product,
                    imageId: null,
                }
            }
            return product
        })

        if (productFound) {
            user.products = products
            await user.save()
        }
    }

    return imageId
}

const getUserFromImageId = async imageId => {
    console.log('getting user from image id:', imageId)
    const image = await UserImage.findOne({ _id: imageId })
    if (!image) {
        console.log('Could not find image to remove.')
        return null
    }
    console.log('image found:', image)
    const user = await User.findOne({ _id: image.user })
    if (!user) {
        console.log('could not find user referenced in image model.')
        return null
    }
    return user
}

const removeImageFromUserImages = async imageId => {

    const user = await getUserFromImageId(imageId)
    
    if (!user) {
        console.log('no user found.')
        return null
    }

    console.log('removeImageFromUserImages:user:', user)
    
    const { images } = user

    if (!images) {
        console.log('no user images')
        return null
    }
    
    const imageExists = images.filter(img => img._id === imageId).length
    console.log(imageExists ? 'image exists' : 'could not find image to remove.')

    if (imageExists) {
        // remove image
        console.log('\nuser images before image removal', images)
        const newImages = images.filter(img => img._id !== imageId)
        console.log('\nuser images after image removal', newImages)
        user.images = newImages
        await user.save()
    }

    return imageId
}

const handleFileUpload = async ({ imageData, thumbData }, path, filename) => {
    
    const regex = /^data:.+\/(.+);base64,(.*)$/

    const image = imageData.uri.match(regex)[2]
    const imageBuffer = Buffer.from(image, 'base64')

    const thumb = thumbData.uri.match(regex)[2]
    const thumbBuffer = Buffer.from(thumb, 'base64')
    
    let dirExists
    try {
        dirExists = await promises.access(path)
    } catch (err) {
        console.log('could not find existing directory:', err)
    }

    if (!dirExists) {
        console.log('path not found. creating path:', path)
        mkdirp.sync(path)
    
        try {
            dirExists = await promises.access(path)
        } catch (err) {
            console.log('could not write path:', err)
            return null
        }
    }

    const imageFile = `${path}/${filename}`

    try {
        await promises.writeFile(imageFile, imageBuffer)
    } catch (err) {
        console.log('Error writing file:', err)
        return null
    }

    // repeated code

    const thumbPath = `${path}/thumb`
    
    try {
        dirExists = await promises.access(thumbPath)
    } catch (err) {
        console.log('could not find existing directory:', err)
    }

    if (!dirExists) {
        console.log('path not found. creating thumb path:', thumbPath)
        mkdirp.sync(thumbPath)
    
        try {
            dirExists = await promises.access(thumbPath)
        } catch (err) {
            console.log('could not write thumb path:', err)
            return null
        }
    }

    const thumbFile = `${thumbPath}/${filename}`

    try {
        await promises.writeFile(thumbFile, thumbBuffer)
    } catch (err) {
        console.log('Error writing thumb file:', err)
        return null
    }
    
    return filename
}

const uploadProductImage = async payload => {
    console.log('uploading product image...')
    const { userId, imageData, thumbData } = payload
    
    const user = await User.findOne({ _id: userId })
    
    const filename = `${userId}-${Date.now()}.png`

    const path = `${imagePath}/${user.username}`
    
    const imagesUploaded = await handleFileUpload({ imageData, thumbData }, path, filename)
    
    if (!imagesUploaded) {
        console.log('Error writing image/thumb.')
        return null
    }

    const data = await saveUserImage(user, filename)
    console.log('uploadProductImage: return data:', data)
    if (!data) {
        console.log('Error saving UserImage to User Images')
        return null
    }

    return data
}

const uploadImage = async (req, res) => {
    console.log('/api/image/upload')
    const { userId, imageData, thumbData } = req.body
    
    const user = await User.findOne({ _id: userId })
    console.log('found user:', user)
    
    const filename = `${userId}-${Date.now()}.png`

    const path = `${imagePath}/${user.username}`
    
    const imagesUploaded = await handleFileUpload({ imageData, thumbData }, path, filename)

    if (!imagesUploaded) {
        console.log('Error writing image/thumb.')
        return res.status(200).json(null)
    }

    const { image } = await saveUserImage(user, filename)
    console.log('saveUserImage result: data:', image._id)

    if (!image) {
        console.log('Error saving UserImage to User Images')
        return res.status(200).json(null)
    }
    
    user.images = [...user.images, image._id]
    await user.save()

    return res.status(200).json(image)
}

const saveUserImage = async (userId, filename) => {
    
    const image = new UserImage({ user: userId, filename })
    await image.save()

    return {
        image: {
            _id: image._id,
            filename: image.filename,
            user: image.user._id,
        }
    }
}

const deletePreview = async (req, res) => {
    const { username, filename } = req.body
    const path = `${imagePath}/${username}`
    const imagesDeleted = await removeImageAndThumb(path, filename)
    if (!imagesDeleted) return res.status(200).json(null)
    return res.status(200).json({ filename })
}

module.exports = {
    deleteImageById,
    deletePreview,
    getImagesByUserId,
    getImageWithUsernameByImageId,
    getImageIdFromFilename,
    getProfileImageByUserId,
    handleFileUpload,
    removeAllImagesFilesByUsername,
    removeImage,
    removeImageAndThumb,
    saveUserImage,
    updateProfileImage,
    uploadAvatar,
    uploadImage,
    uploadProductImage,
}
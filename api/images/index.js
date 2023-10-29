const Product = require('../../models/Product')
const User = require('../../models/User')
const UserImage = require('../../models/UserImage')
const { promises, rm, rmSync } = require('fs')
const { mkdirp } = require('mkdirp')
const gm = require('gm')
const im = gm.subClass({ imageMagick: true })

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
        .populate('user', 'username images')

    return res.status(200).json({ images })
}

const getProfileImageByUserId = async (req, res) => {
    
    const user = await User
        .findOne({ _id: req.params.id })
        .populate('profileImage', 'filename')

    return res.status(200).json(user)
}

const getImageWithUsernameByImageId = async (req, res) => {
    
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

    // remove the image from the user images
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
        .populate({
            path: 'user',
            select: 'username images',
            populate: { path: 'images' },
        })

    if (!deletedImage) console.log('Could not find image to delete')

    const userPath = `${imagePath}/${deletedImage.user.username}`
    const filenameToDelete = deletedImage.filename

    const pathToThumb = `${userPath}/thumb/${filenameToDelete}`
    const pathToAvatar = `${userPath}/${filenameToDelete}`

    const { images, profileImage } = deletedImage.user

    const updatedImages = images.filter(imageId => imageId !== _id)
    
    const updatedUser = await User.
        findOneAndUpdate({ _id: deletedImage.user._id },
        {
            $set: {
                profileImage: profileImage !== imageId ? profileImage : null,
                images: updatedImages,
            }
        },
        { new: true })
    
    if (!updatedUser) return res.status(200).json({
        error: 'Could not update user after image deletion.'
    })

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
    const image = await UserImage.findOne({ _id: imageId })
    if (!image) {
        console.log('Could not find image to remove.')
        return null
    }
    const user = await User.findOne({ _id: image.user })
    if (!user) {
        console.log('could not find user referenced in image model.')
        return null
    }
    return user
}

const removeImageFromUserImages = async imageId => {

    const user = await getUserFromImageId(imageId)
    const { images } = user

    const imageExists = images.filter(img => img._id === imageId).length

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

const uploadImage = async (req, res) => {

    const { userId, imageData, thumbData } = req.body
    
    const user = await User.findOne({ _id: userId })
    
    const filename = `${userId}-${Date.now()}.png`

    const path = `${imagePath}/${user.username}`
    
    const imagesUploaded = await handleFileUpload({ imageData, thumbData }, path, filename)
    if (!imagesUploaded) {
        console.log('Error writing image/thumb.')
        return res.status(200).json(null)
    }

    const data = await saveUserImage(user, filename)

    if (!data) {
        console.log('Error saving UserImage to User Images')
        return res.status(200).json(null)
    }

    return res.status(200).json(data)
}

const saveUserImage = async (userId, filename) => {
    
    const image = new UserImage({ user: userId, filename })
    await image.save()
    
    const user = await User
        .findOne({ _id: userId })

    const userUpdated = await User
        .findOneAndUpdate(
            { _id: user._id },
            { $set: {
                images: [...user.images, image._id]
            } },
            { new: true },
        )
    
    if (!userUpdated) {
        console.log('could not add new image to user images.')
    }

    return {
        image,
        user: userUpdated,
    }
    
    // let image = await UserImage.findOne({ user: userId, filename })
    // if (image) {
    //     const images = [...user.images, image._id]
    //     const userUpdated = await User
    //         .findOneAndUpdate(
    //             { _id: user._id },
    //             { $set: { images } },
    //             { new: true },
    //         )
        
    //     if (!userUpdated) return res.status(200).json({ error: `Error updating user images.` })    
    // } else {
    //     image = new UserImage({ user: userId, filename })
    //     await image.save()
    // }
}

const uploadProductImage = async (req, res) => {
    
    const { userId, imageData, thumbData } = req.body
    
    const user = await User.findOne({ _id: userId })
    console.log('found user to update with new product image:', user)
    
    const filename = `${userId}-${Date.now()}.png`
    const path = `${imagePath}/${user.username}`
    
    const imagesUploaded = await handleFileUpload({ imageData, thumbData }, path, filename)
    if (!imagesUploaded) {
        console.log('Error writing image/thumb.')
        return res.status(400).json({ error: `Error writing image/thumb files.` })
    }

    return res.status(200).json({ filename })
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
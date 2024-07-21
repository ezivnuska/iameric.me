const Product = require('../../models/Product')
const User = require('../../models/User')
const UserImage = require('../../models/UserImage')
const { mkdir, promises, rm, rmSync } = require('fs')
// const { mkdirp } = require('mkdirp')
const path = require('path')
// const gm = require('gm')
// const im = gm.subClass({ imageMagick: true })
// const imagePath = '/assets'
// const imagePath = 'https://www.iameric.me/assets'
const uploadDir = '/var/www/iameric.me/html/assets'

const getImageIdFromFilename = async (req, res) => {
    const { name } = req.params
    const image = await UserImage
        .find({ filename: name })

    return res.status(200).json({ image })
}

const ensureUploadDirExists = dir => {
    try {
        mkdir(dir, { recursive: true }, err => {
            if (err) throw new Error()
            else console.log('Assets directory created successfully')
        })
    } catch (err) {
        console.error('Error creating assets directory:', err)
        return false
    }
    return true
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
        .populate({ path: 'profileImage', select: 'filename width height' })

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
    
    const { _id, filename, user, height, width } = image
    
    const data = { _id, filename, user, height, width }
    
    return res.status(200).json(data)
}

const updateProfileImage = async (req, res) => {
    const { userId, imageId } = req.body
    
    let user = null
    let message = null
    if (imageId) {
        user = await User
            .findOneAndUpdate({ _id: userId }, { $set: { profileImage: imageId } }, { new: true })
            .populate({ path: 'profileImage', select: 'filename width height' })
        if (!user) message = 'Error updating profile image'
    } else {
        user = await User
            .findOneAndUpdate({ _id: userId }, { $set: { profileImage: null } }, { new: true })
        if (!user) message = 'Error clearing profile image'
    }

    if (message) {
        console.log(message)
        return res.status(200).json(null)
    }
    
    return res.status(200).json({ user })
}

const removeImage = path => rm(path, () => console.log('removed file at path', path))

const removeAllImageFilesByUsername = username => {
    let imagesRemoved = false
    const filepath = path.join(uploadDir, username)
    try {
        rmSync(
            filepath,
            {
                recursive: true,
                force: true ,
            }
        )
        imagesRemoved = true
    } catch (e) {
        console.log(`Warning: Error deleting image directory '/assets${username}'`)
    }
    return imagesRemoved
}

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

    const userDir = path.join(uploadDir, user.username)

    console.log('\nwriting avatar to path', userDir)
    const avatarname = await handleFileUpload(avatar, userDir, timestamp)
    console.log(`avatar written: ${userDir}/${avatarname}`)
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

    user.profileImage = newImage._id
    await user.save()

    const { profileImage } = user
    
    return res.status(200).json({ profileImage, imageId: newImage._id })
}

const uploadImage = async (req, res) => {
    
    const { userId, imageData, thumbData, avatar } = req.body
    const { height, width } = imageData
    
    const user = await User.findOne({ _id: userId })
    
    const filename = `${userId}-${Date.now()}.png`
    
    const userDir = path.join(uploadDir, user.username)
    
    const imagesUploaded = await handleFileUpload({ imageData, thumbData }, userDir, filename)
    
    if (!imagesUploaded) {
        console.log('Error writing image/thumb.')
        return res.status(200).json(null)
    }
    
    const { image } = await saveUserImage(user._id, filename, height, width)
    
    if (!image) console.log('Error saving UserImage to User Images')
    else {
        user.profileImage = image._id
        await user.save()
        return res.status(200).json({ image })
    }
    return res.status(200).json(null)
}

const deleteImageById = async (req, res) => {
    const { imageId, isProductImage, isProfileImage } = req.body
    console.log(`deleteImageById: ${imageId}`)
    
    // check to see if it is a product image
    if (isProductImage) {
        const productImage = await findAndRemoveImageFromProduct(imageId)
        console.log('image is product image.', productImage)
        if (!productImage) {
            console.log('error removing product image.')
            // stop here.
            return null
        }
        console.log('image removed from user product.')
    }

    // remove profile image reference to image

    if (isProfileImage) {
        const profileImage = await clearUserProfileImage(imageId)
        console.log('image is profile image.', profileImage)
        if (!profileImage) {
            console.log('error clearing profile image reference to image.')
            return null
        }
        console.log('profile image reference removed from user.')
    }
    
    const deletedImage = await UserImage.findOneAndRemove({ _id: imageId })

    if (!deletedImage) console.log('Could not find image to delete')
    else {
        const user = await User.findOne({ _id: deletedImage.user })

        if (!user) {
            console.log('could not find user to update after image deletion.')
        } else {
            const userDir = path.join(uploadDir, user.username)
            const filenameToDelete = deletedImage.filename
    
            const pathToThumb = `${userDir}/thumb/${filenameToDelete}`
            const pathToAvatar = `${userDir}/${filenameToDelete}`
            
            if (isProfileImage) {
                user.profileImage = null
                await user.save()
            }
    
            // const product = 
            await Product.findOneAndUpdate({ image: imageId }, { $set: { image: null }})
            
            // if (product) {
            //     product.image = null
            //     await product.save()
            // }
    
            removeImage(pathToAvatar)
            removeImage(pathToThumb)
    
            return res.status(200).json({ deletedImage })
        }

    }
    return res.status(200).json(null)
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
            if (product.image === imageId) {
                productFound = true
                return {
                    ...product,
                    image: null,
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

const handleFileUpload = async ({ imageData, thumbData }, uploadPath, filename) => {
    
    const regex = /^data:.+\/(.+);base64,(.*)$/

    const image = imageData.uri.match(regex)[2]
    const imageBuffer = Buffer.from(image, 'base64')

    const thumb = thumbData.uri.match(regex)[2]
    const thumbBuffer = Buffer.from(thumb, 'base64')
    
    let dirExists = ensureUploadDirExists(uploadPath)
    
    // try {
    //     dirExists = await promises.access(uploadPath)
    //     console.log(`${uploadPath} exists: ${dirExists}`)
    // } catch (err) {
    //     console.log('could not find existing directory:', err)
    // }

    // if (!dirExists) {
    //     console.log('path not found. creating path:', uploadPath)
    //     mkdir(uploadPath)
    
    //     try {
    //         dirExists = await promises.access(uploadPath)
    //     } catch (err) {
    //         console.log('could not write path:', err)
    //         return null
    //     }
    // }

    const imageFile = path.join(uploadPath, filename)

    try {
        await promises.writeFile(imageFile, imageBuffer)
    } catch (err) {
        console.log('Error writing file:', err)
        return null
    }

    // repeated code

    const thumbPath = path.join(uploadPath, 'thumb')

    dirExists = ensureUploadDirExists(thumbPath)
    
    // try {
    //     dirExists = await promises.access(thumbPath)
    // } catch (err) {
    //     console.log('could not find existing directory:', err)
    // }

    // if (!dirExists) {
    //     console.log('path not found. creating thumb path:', thumbPath)
    //     mkdir(thumbPath)
    
    //     try {
    //         dirExists = await promises.access(thumbPath)
    //     } catch (err) {
    //         console.log('could not write thumb path:', err)
    //         return null
    //     }
    // }

    const thumbFile = path.join(thumbPath, filename)

    try {
        await promises.writeFile(thumbFile, thumbBuffer)
    } catch (err) {
        console.log('Error writing thumb file:', err)
        return null
    }
    console.log(`returning filename ${filename} at path ${thumbPath}`)
    return filename
}

const uploadProductImage = async payload => {
    
    const { userId, imageData, thumbData } = payload
    const { height, width } = imageData

    const user = await User.findOne({ _id: userId })
    
    const filename = `${userId}-${Date.now()}.png`

    const userDir = path.join(uploadDir, user.username)
    
    const uploadFilename = await handleFileUpload({ imageData, thumbData }, userDir, filename)
    
    if (!uploadFilename) {
        console.log('Error writing image/thumb.')
        return null
    }

    console.log('uploadFilename:', uploadFilename)

    const data = await saveUserImage(user, uploadFilename, height, width)
    
    if (!data) {
        console.log('Error saving UserImage to User Images')
        return null
    }

    return data
}

const saveUserImage = async (userId, filename, height, width) => {
    
    const image = new UserImage({ user: userId, filename, height, width })
    
    await image.save()

    const savedImage = await UserImage
        .findOne({ _id: image._id })
        .populate('user', 'username')
    
    return {
        image: savedImage,
    }
}

const deletePreview = async (req, res) => {
    const { username, filename } = req.body
    const userDir = path.join(uploadDir, username)
    const imagesDeleted = await removeImageAndThumb(userDir, filename)
    if (!imagesDeleted) return res.status(200).json(null)
    return res.status(200).json({ filename })
}

const setImageCaption = async (req, res) => {
    const { id, text } = req.body
    let image = await UserImage.findOne({ _id: id })
    if (!image) console.log('Error adding image caption')
    else {
        image.caption = text
        image = await UserImage
            .findOneAndUpdate({ _id: id }, { $set: { caption: text } }, { new: true })
            .populate('user', 'username')
            return res.status(200).json({ image })
    }
    return res.status(200).json(null)
}

const loadImage = async (req, res) => {
    const { id } = req.params
    let image = await UserImage
        .findOne({ _id: id })
        .populate('user')
    
    if (!image) console.log('Error loading image')
    
    return res.status(200).json(image ? { image } : null)
}

module.exports = {
    deleteImageById,
    deletePreview,
    getImagesByUserId,
    getImageWithUsernameByImageId,
    getImageIdFromFilename,
    getProfileImageByUserId,
    handleFileUpload,
    loadImage,
    removeAllImageFilesByUsername,
    removeImage,
    removeImageAndThumb,
    saveUserImage,
    setImageCaption,
    updateProfileImage,
    uploadAvatar,
    uploadImage,
    uploadProductImage,
}
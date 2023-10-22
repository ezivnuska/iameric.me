const User = require('../../models/User')
const UserImage = require('../../models/UserImage')
const { promises, rm, rmSync } = require('fs')
const { mkdirp } = require('mkdirp')
const gm = require('gm')
const im = gm.subClass({ imageMagick: true })
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
    
    if (!image) return res.status(200).json({ error: 'Error fetching image data.' })
    
    const { _id, filename, user } = image
    
    return res.status(200).json({ _id, filename, user })
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

const removeImage = path => {
    return rm(path, () => console.log('removed file at path', path))
}

const removeAllImagesFilesByUsername = async username => await rmSync(
    `${IMAGE_PATH}/${username}`,
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

    const path = `${IMAGE_PATH}/${user.username}`

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
    
    const deletedImage = await UserImage
        .findOneAndRemove({ _id: req.body._id })
        .populate({
            path: 'user',
            select: 'username images',
            populate: { path: 'images' },
        })

    if (!deletedImage) console.log('Could not find image to delete')

    const userPath = `${IMAGE_PATH}/${deletedImage.user.username}`
    const filenameToDelete = deletedImage.filename

    const pathToThumb = `${userPath}/thumb/${filenameToDelete}`
    const pathToAvatar = `${userPath}/${filenameToDelete}`

    const { images, profileImage } = deletedImage.user

    const updatedImages = images.filter(imageId => imageId !== _id)
    
    const updatedUser = await User.
        findOneAndUpdate({ _id: deletedImage.user._id },
        {
            $set: {
                profileImage: profileImage !== _id ? profileImage : null,
                images: updatedImages,
            }
        },
        { new: true })
    
    if (!updatedUser) return res.status(200).json({
        error: 'Could not update user after image deletion.'
    })

    const product = await Product
        .findOne({ imageId: _id })
    
    if (product) {
        product.imageId = null
        await product.save()
    }

    await removeImage(pathToAvatar)
    await removeImage(pathToThumb)

    return res.status(200).json({ id: deletedImage._id })
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

    const path = `${IMAGE_PATH}/${user.username}`
    
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
    
    const filename = `${userId}-${Date.now()}.png`
    const path = `${IMAGE_PATH}/${user.username}`
    
    const imagesUploaded = await handleFileUpload({ imageData, thumbData }, path, filename)
    if (!imagesUploaded) {
        console.log('Error writing image/thumb.')
        return res.status(400).json({ error: `Error writing image/thumb files.` })
    }

    return res.status(200).json({ filename })
}

const deletePreview = async (req, res) => {
    const { username, filename } = req.body
    const path = `${IMAGE_PATH}/${username}`
    const imagesDeleted = await removeImageAndThumb(path, filename)
    if (!imagesDeleted) return res.status(200).json(null)
    return res.status(200).json({ filename })
}

module.exports = {
    deleteImageById,
    deletePreview,
    getImagesByUserId,
    getImageWithUsernameByImageId,
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
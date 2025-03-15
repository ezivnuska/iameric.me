const User = require('../../models/User')
const UserImage = require('../../models/UserImage')
const scrubImage = require('./scrubImage')
const path = require('path')
const { remove } = require('fs-extra')

const uploadDir = process.env.IMAGE_PATH || 'assets'

const removeImage = async (dir, filename) => {

    const imagePath = `${dir}/${filename}`
    const thumbPath = `${dir}/thumb/${filename}`
    remove(imagePath, () => console.log('removed image file at path', imagePath))
    remove(thumbPath, () => console.log('removed thumb file at path', thumbPath))
}

const deleteImage = async (req, res) => {

    const { imageId } = req.body

    let deletedImage = await UserImage.findOneAndRemove({ _id: imageId })

    deletedImage = await scrubImage(imageId)

    if (deletedImage) {
        let user = await User.findOne({ _id: deletedImage.user })
        
        const dir = path.join(uploadDir, user.username)
        const filename = deletedImage.filename
        
        await removeImage(dir, filename)

        return res.status(200).json({
            deletedImage,
        })

    }
    
    return res.status(200).json(null)
}

module.exports = deleteImage
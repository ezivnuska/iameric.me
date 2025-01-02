const User = require('../../models/User')
const UserImage = require('../../models/UserImage')
const path = require('path')
const { remove } = require('fs-extra')

const uploadDir = process.env.IMAGE_PATH || 'assets'

const removeImage = async (dir, filename) => {

    const imagePath = `${dir}/${filename}`
    const thumbPath = `${dir}/thumb/${filename}`
    remove(imagePath, () => console.log('removed image file at path', imagePath))
    remove(thumbPath, () => console.log('removed thumb file at path', thumbPath))
}

const deleteImageById = async (req, res) => {

    const deletedImage = await UserImage.findOneAndRemove({ _id: req.body.imageId })

    if (deletedImage) {
        let user = await User.findOne({ _id: deletedImage.user })
        
        const dir = path.join(uploadDir, user.username)
        const filename = deletedImage.filename
        
        removeImage(dir, filename)
        
        let userModified = false
        
        if (user.profileImage?.toString() === deletedImage._id.toString()) {
            user.profileImage = null
            userModified = true
        }

        await user.save()

        const response = {
            deletedImage,
            modifiedUser: userModified ? user : null,
        }

        return res.status(200).json(response)

    }
    
    return res.status(200).json(null)
}

module.exports = deleteImageById
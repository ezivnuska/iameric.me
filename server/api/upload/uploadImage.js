const User = require('../../models/User')
const handleFileUpload = require('./handleFileUpload')
const saveUserImage = require('./saveUserImage')
const path = require('path')

const uploadDir = process.env.IMAGE_PATH || 'assets'

const uploadImage = async (req, res) => {
    
    const { userId, imageData, thumbData, avatar, location } = req.body
    const { height, width } = imageData
    
    const user = await User.findOne({ _id: userId })
    
    const filename = `${userId}-${Date.now()}.png`
    
    const userDir = path.join(uploadDir, user.username)
    
    const imagesUploaded = await handleFileUpload({ imageData, thumbData }, userDir, filename)
    
    if (!imagesUploaded) {
        console.log('Error writing image/thumb.')
        return res.status(200).json(null)
    }
    
    const { image } = await saveUserImage(user._id, filename, height, width, location)
    
    if (image) {
        
        if (avatar) {
            user.profileImage = image._id
            await user.save()
        }
        return res.status(200).json({ image })
    }
    
    console.log('Error saving UserImage to User Images')
    return res.status(200).json(null)
}

module.exports = uploadImage
const handleFileUpload = require('./handleFileUpload')
const saveUserImage = require('./saveUserImage')
const User = require('../../models/User')

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

module.exports = uploadImage
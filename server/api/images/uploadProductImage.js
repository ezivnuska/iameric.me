const User = require('../../models/User')
const handleFileUpload = require('./handleFileUpload')
const saveUserImage = require('./saveUserImage')

const uploadDir = process.env.IMAGE_PATH || 'assets'

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

    const data = await saveUserImage(user, uploadFilename, height, width)
    
    if (!data) console.log('Error saving UserImage to User Images')
    else return data
    return null
}

module.exports = uploadProductImage
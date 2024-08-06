const User = require('../../models/User')
const handleFileUpload = require('./handleFileUpload')
const saveBipImage = require('./saveBipImage')
const path = require('path')

const uploadDir = process.env.IMAGE_PATH || 'assets'

const uploadBipImage = async (req, res) => {
    const { bipId, userId, imageData, thumbData } = req.body
    const { height, width } = imageData
    
    const user = await User.findOne({ _id: userId })
    // console.log('USR', user)
    
    const filename = `${userId}-${Date.now()}.png`

    const userDir = path.join(uploadDir, user.username)
    const bipDir = path.join(userDir, 'bips')
    
    const uploadFilename = await handleFileUpload({ imageData, thumbData }, bipDir, filename)
    
    if (!uploadFilename) {
        console.log('Error writing image/thumb for BipImage.', bipId)
        return null
    }
    const bipImage = {
        bipId,
        path: bipDir,
        filename: uploadFilename,
        height,
        width,
    }
    
    const data = await saveBipImage(bipImage)

    if (!data) console.log('Error saving BipImage to User Images')
    else return res.status(200).json(data)
    return res.status(200).json(null)
}

module.exports = uploadBipImage
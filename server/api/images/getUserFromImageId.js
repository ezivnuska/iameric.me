const User = require('../../models/User')
const UserImage = require('../../models/UserImage')

const getUserFromImageId = async (req, res) => {
    
    const image = await UserImage.findOne({ _id: req.params.id })
    
    if (!image) {
        console.log('Could not find image to determine owner.')
        return res.status(200).json(null)
    }
    
    const user = await User.findOne({ _id: image.user._id })
    
    if (!user) {
        console.log('could not find user referenced in image model.')
        return res.status(200).json(null)
    }

    return res.status(200).json({ user })
}

module.exports = getUserFromImageId
const User = require('../../models/User')
const UserImage = require('../../models/UserImage')

const getUserAndImageIds = async (req, res) => {

    const user = await User.findOne({ username: req.params.username })
        .populate('profileImage', 'filename width height' )
        .populate('address')

    if (!user) {
        console.log('could not get user and images by username.')
        return res.status(406).json(null)
    }

    const images = await UserImage.find({ user: user._id })

    if (!images) console.log('Error: Could not load user images.')
    
    return res.status(200).json({ user, images: images.map(image => image._id) })
}

module.exports = getUserAndImageIds
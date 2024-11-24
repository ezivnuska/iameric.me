const User = require('../../models/User')
const UserImage = require('../../models/UserImage')

const getUserByUsername = async (req, res) => {

    const user = await User.findOne({ username: req.params.username })
        .populate({ path: 'profileImage', select: 'filename width height' })
        .populate('address')

    if (!user) {
        console.log('could not get user by username.')
        return res.status(406).json(null)
    } else {

        if (req.query.images) {
            
            const images = await UserImage.find({ user: user._id })
                .populate({ path: 'user', select: 'username' })
            
            if (!images) console.log('Error: Could not load user images.')
            
            return res.status(200).json({ user, images })
        }

    }
}

module.exports = getUserByUsername
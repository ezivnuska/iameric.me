const User = require('../../models/User')
const UserImage = require('../../models/UserImage')

const getUserByUsername = async (req, res) => {

    const user = await User
        .findOne({ username: req.params.username })
        .select('_id username role profileImage')
        .populate({
            path: 'profileImage',
            select: 'filename width height',
        })
        // .populate('profileImage', 'filename width height')
        // .populate('address')
    
    if (!user) {
        console.log('could not get user by username.')
        return res.status(406).json(null)
    }

    return res.status(200).json({ user })
}

module.exports = getUserByUsername
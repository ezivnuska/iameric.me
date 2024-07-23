const User = require('../../models/User')

const getUserByUsername = async (req, res) => {
    const user = await User.findOne({ username: req.params.username })
        .populate({ path: 'profileImage', select: 'filename width height' })
        .populate('location')
        
    if (!user) console.log('could not get user by username.')
    else return res.status(200).json({ user })
    return res.status(406).json(null)
}

module.exports = getUserByUsername
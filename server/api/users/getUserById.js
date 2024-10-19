const User = require('../../models/User')

const getUserById = async (req, res) => {
    const user = await User.findOne({ _id: req.params.id })
        .populate({ path: 'profileImage', select: 'filename width height' })
        .populate('address')
        
    if (!user) console.log('could not get user by id.')
    else return res.status(200).json({ user })
    return res.status(406).json(null)
}

module.exports = getUserById
const User = require('../../models/User')

const getUserDetailsById = async (req, res) => {
    const user = await User
        .findOne({ _id: req.params.id })
        .populate('profileImage', 'filename width height')
        .populate('location')
        .populate('images')
        
    if (!user) console.log('could not get user by id.')
    else return res.status(200).json({ user })
    return res.status(406).json(null)
}

module.exports = getUserDetailsById
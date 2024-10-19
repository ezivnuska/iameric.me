const getDecodedUser = require('./getDecodedUser')
const User = require('../../models/User')

const validateToken = async (req, res) => {
    const { token } = req.params
    
    const decodedUser = getDecodedUser(token)

    if (!decodedUser) return res.status(200).json(null)
    
    const { _id, exp } = decodedUser

    // if (!_id) return res.status(200).json(null)
    
    const user = await User
        .findOne({ _id })
        .populate('profileImage', 'filename width height')
        .populate('address')
    
    if (!user) return res.status(200).json(null)

    const newDate = new Date(exp) - Date.now()
    const expired = newDate > 0

    if (expired) return res.status(200).json(null)

    return res.status(200).json(user)
}

module.exports = validateToken
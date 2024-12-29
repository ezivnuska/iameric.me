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
        // .select('_id username role profileImage')
        .populate('profileImage', 'filename width height')
        // .populate('address')
        
    const newDate = new Date(exp) - Date.now()
    const expired = newDate > 0

    if (!user || expired) return res.status(200).json(null)

    return res.status(200).json(user)
}

module.exports = validateToken
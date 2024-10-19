const User = require('../../models/User')

const getAvailableUsers = async (req, res) => {
    const users = await User
        .find({ available: true })
        .populate({
            path: 'profileImage',
            select: 'filename width height',
        })
    
    if (users) return res.status(200).json({ users })
    else console.log('Could not fetch available users')
    return res.status(200).json(null)
}

module.exports = getAvailableUsers
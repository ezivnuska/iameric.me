const User = require('../../models/User')

const getUsers = async (req, res) => {
    const users = await User
        .find({})
        .populate({
            path: 'profileImage',
            select: 'filename width height',
        })
    
    if (!users) console.log('Could not fetch users')
    else return res.status(200).json({ users })
    return res.status(200).json(null)
}

module.exports = getUsers
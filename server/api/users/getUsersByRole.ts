const User = require('../../models/User')

const getUsersByRole = async (req, res) => {
    const { role } = req.params
    let query = role === 'admin' ? {} : { role }
    const users = await User
        .find(query)
        .populate({
            path: 'profileImage',
            select: 'filename width height',
        })
    
    if (!users) console.log('Could not fetch users')
    else return res.status(200).json({ users })
    return res.status(200).json(null)
}

module.exports = getUsersByRole
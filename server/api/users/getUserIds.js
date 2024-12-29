const User = require('../../models/User')

const getUserIds = async (req, res) => {
    const users = await User
        .find({})
        .select('_id username')
        // .populate({
        //     path: 'profileImage',
        //     select: 'filename width height',
        // })
    
    if (!users) console.log('Could not fetch users')
    else return res.status(200).json({ users })
    return res.status(200).json(null)
}

module.exports = getUserIds
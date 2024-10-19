const User = require('../../models/User')

const getNumberOfOnlineUsers = async (req, res) => {
    const users = await User.find({ 'token': { $ne: null } })
    if (!users) console.log('Could not fetch number of online users')
    else return res.status(200).json({ userCount: users.length })
    return res.status(200).json(null)
}

module.exports = getNumberOfOnlineUsers
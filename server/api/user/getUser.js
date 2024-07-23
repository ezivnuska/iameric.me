const User = require('../../models/User')

const getUser = async (req, res) => {
    const { id } = req.params
    const user = await User.findOne({ _id: id })
        .populate('profileImage', 'filename width height')
        .populate('location')
    
    if (!user) console.log('Could not fetch users')
    else return res.status(200).json(user)
    return res.status(200).json(null)
}

module.exports = getUser
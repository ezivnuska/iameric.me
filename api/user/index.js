const User = require('../../models/User')
const UserImage = require('../../models/UserImage')
const Product = require('../../models/Product')

const getUser = async (req, res) => {
    const user = await User
        .findOne({ token: req.params.token })
        .populate('profileImage', 'filename width height')
        .populate('location')
    
    if (!user) console.log('Could not fetch users')
    else return res.status(200).json(user)
    return res.status(200).json(null)
}

module.exports = {
    getUser,
}
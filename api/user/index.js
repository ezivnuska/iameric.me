const User = require('../../models/User')
const UserImage = require('../../models/UserImage')
const Product = require('../../models/Product')

const getProfileImage = async (req, res) => {
    const { id } = req.params
    const image = await UserImage.findOne({ _id: id })
    if (!image) console.log('could not get profile image with id')
    else return res.status(200).json(image)
    return res.status(200).json(null)
}

const getUser = async (req, res) => {
    const { id } = req.params
    const user = await User.findOne({ _id: id })
        .populate('profileImage', 'filename width height')
        .populate('location')
    
    if (!user) console.log('Could not fetch users')
    else return res.status(200).json(user)
    return res.status(200).json(null)
}

const addToDeposit = async (req, res) => {
    const { id, value } = req.body
    const user = await User.findOne({ _id: id })
    if (user) {
        user.deposit = user.deposit + value
        await user.save()
        return res.status(200).json(user)
    }
    return res.status(200).json(null)
}

const withdrawDeposit = async (req, res) => {
    const { id } = req.body
    const user = await User.findOne({ _id: id })
    if (user) {
        user.deposit = 0
        await user.save()
        return res.status(200).json(user)
    }
    return res.status(200).json(null)
}

module.exports = {
    addToDeposit,
    withdrawDeposit,
    getProfileImage,
    getUser,
}
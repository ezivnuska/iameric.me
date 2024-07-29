const User = require('../../models/User')
const UserImage = require('../../models/UserImage')
const Product = require('../../models/Product')

const getVendor = async (req, res) => {

    const { id } = req.params
    
    let user = null

    let vendor = await User
        .findOne({ _id: id })
        .populate('address')
        .populate({
            path: 'profileImage',
            select: 'filename width height'
        })
        
    if (!vendor) {
        console.log('could not fetch vendor')
        return res.status(200).json(null)
    }

    user = vendor.toObject()
    
    const images = await UserImage
        .find({ user: id })
        .populate({
            path: 'user',
            select: 'username',
        })

    if (!images) {
        console.log('could not fetch vendor images')
        return res.status(200).json(null)
    }
    
    user = { ...user, images }

    const products = await Product
        .find({ vendor: id })
        .populate({
            path: 'image',
            select: 'filename width height',
        })
        .populate({
            path: 'vendor',
            select: 'username',
        })
    
    if (!products) console.log('could not load products for vendor')
    else {
        user = { ...user, products }
        return res.status(200).json({ vendor: user })
    }
    return res.status(200).json(null)
}

module.exports = getVendor
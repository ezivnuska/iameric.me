const User = require('../../models/User')
const UserImage = require('../../models/UserImage')
const Product = require('../../models/Product')

const getUsers = async (req, res) => {

    const users = await User
        .find({})
        .populate({
            path: 'profileImage',
            select: 'filename width height',
        })
    
    if (!users) {
        console.log('Could not fetch users')
        return res.status(200).json(null)
    }

    return res.status(200).json({ users })
}

const getUsersByRole = async (req, res) => {
    const { role } = req.params
    let query = role === 'admin' ? {} : { role }
    const users = await User
        .find(query)
        .populate({
            path: 'profileImage',
            select: 'filename width height',
        })
    
    if (!users) {
        console.log('Could not fetch users')
        return res.status(200).json(null)
    }

    return res.status(200).json({ users })
}

const getNumberOfOnlineUsers = async (req, res) => {
    
    const users = await User
        .find({ 'token': { $ne: null } })
    
    if (!users) {
        console.log('Could not fetch number of online users')
        return res.status(200).json(null)
    }

    return res.status(200).json({ userCount: users.length })
}

const getAllVendorIds = async (req, res) => {
    
    let vendors = await User
        .find({ role: 'vendor' })
    
    if (!vendors) {
        console.log('could not find any vendors.')
        return res.status(200).json(null)
    }

    const vendorIds = vendors.map(vendor => vendor._id)

    return res.json({ vendorIds })
}

const getAllVendors = async (req, res) => {
    
    let vendors = await User
        .find({ role: 'vendor' })
        .populate({
            path: 'profileImage',
            select: 'filename width height'
        })
    
    if (!vendors)
        console.log('could not fetch all vendors.')
    else return res.status(200).json({ vendors })

    return res.status(200).json(null)
}

const getVendor = async (req, res) => {

    const { id } = req.params
    
    let user = null

    let vendor = await User
        .findOne({ _id: id })
        .populate('location')
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
    
    if (!products) {
        console.log('could not load products for vendor')
        return res.status(200).json(null)
    }

    user = { ...user, products }

    return res.status(200).json({ vendor: user })
}

const getUserById = async (req, res) => {
    
    const user = await User
        .findOne({ _id: req.params.id })
        .populate({
            path: 'profileImage',
            select: 'filename width height',
        })
        
    if (!user) {
        console.log('could not get user by id.')
        return res.status(406).json(null)
    }
        
    return res.status(200).json({ user })
}

const getUserAndImagesById = async (req, res) => {
    
    const user = await User
        .findOne({ _id: req.params.id })
        .populate({
            path: 'profileImage',
            select: 'filename width height',
        })

    if (!user) {
        console.log('could not get user by id.')
        return res.status(406).json(null)
    }
    
    const images = await UserImage
        .find({ user: req.params.id })
        .populate({
            path: 'user',
            select: 'username',
        })

    return res.status(200).json({
        user: {
            ...user,
            images,
        }
    })
}

const getUserDetailsById = async (req, res) => {
    
    const user = await User
        .findOne({ _id: req.params.id })
        .populate('profileImage', 'filename width height')
        .populate('location')
        .populate('images')
        
    if (!user) {
        console.log('could not get user by id.')
        return res.status(406).json(null)
    }
        
    return res.status(200).json({ user })
}

module.exports = {
    getUsers,
    getUsersByRole,
    getNumberOfOnlineUsers,
    getAllVendorIds,
    getAllVendors,
    getUserById,
    getUserAndImagesById,
    getUserDetailsById,
    getVendor,
}
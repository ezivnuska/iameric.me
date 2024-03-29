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
        .populate({ path: 'profileImage', select: 'filename width height' })
    
    if (!vendors) {
        console.log('could not fetch all vendors.')
        return res.json(null)
    }

    vendors = vendors.map(({
        _id,
        profileImage,
        username,
    }) => ({
        _id,
        profileImage: profileImage || null,
        username,
    }))
    
    return res.json({ vendors })
}

const getUserById = async (req, res, next) => {
    
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

module.exports = {
    getUsersByRole,
    getNumberOfOnlineUsers,
    getAllVendorIds,
    getAllVendors,
    getUserById,
}
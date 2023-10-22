const User = require('../../models/User')

const getAllUsers = async (req, res) => {
    
    const users = await User.
        find({})
    
    if (!users) {
        console.log('Could not fetch users')
        return res.json(null)
    }

    return res.status(200).json({ users })
}

const getAllVendors = async (req, res) => {
    
    let vendors = await User
        .find({ role: 'vendor' })
        .populate('profileImage', 'filename')
    
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
        .populate('location')
        .populate('profileImage', 'filename')
        
    if (!user) {
        console.log('could not get user by id.')
        return res.status(406).json(null)
    }
        
    return res.status(200).json({ user })
}

module.exports = {
    getAllUsers,
    getAllVendors,
    getUserById,
}
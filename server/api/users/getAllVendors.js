const User = require('../../models/User')

const getAllVendors = async (req, res) => {
    
    let vendors = await User
        .find({ role: 'vendor' })
        .populate({
            path: 'profileImage',
            select: 'filename width height'
        })
    
    if (!vendors) console.log('could not fetch all vendors.')
    else return res.status(200).json({ vendors })
    return res.status(200).json(null)
}

module.exports = getAllVendors
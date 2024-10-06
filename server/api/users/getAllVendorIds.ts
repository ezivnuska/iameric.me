const User = require('../../models/User')

const getAllVendorIds = async (req, res) => {
    let vendors = await User.find({ role: 'vendor' })    
    if (!vendors) console.log('could not find any vendors.')
    else {
        const vendorIds = vendors.map(vendor => vendor._id)
        return res.json({ vendorIds })
    }
    return res.status(200).json(null)
}

module.exports = getAllVendorIds
const User = require('../../models/User')

const getVendors = async (req, res) => {
    const vendors = await User
        .find({ fiction: true })
        .populate({
            path: 'profileImage',
            select: 'filename width height',
        })
    
    if (vendors) return res.status(200).json({ vendors })
    else console.log('Could not fetch vendors')
    return res.status(200).json(null)
}

module.exports = getVendors
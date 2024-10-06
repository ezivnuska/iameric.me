const Bip = require('../../models/Bip')

const getBips = async (req, res) => {
    
    const bips = await Bip
        .find({})
        .populate({
            path: 'user',
            select: 'username profileImage',
            populate: { path: 'profileImage' },
        })
        .sort({ createdAt: -1 })
    
    if (!bips) console.log('error fetching bips.')
    else return res.status(200).json({ bips })
    return res.status(200).json(null)
}

module.exports = getBips
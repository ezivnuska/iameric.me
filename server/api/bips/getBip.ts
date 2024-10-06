const Bip = require('../../models/Bip')

const getBip = async (req, res) => {
    
    const { id } = req.params

    const bip = await Bip
        .findOne({ _id: id })
        .populate({
            path: 'user',
            select: 'username profileImage',
            populate: { path: 'profileImage' },
        })
        .sort({ createdAt: -1 })
    
    if (!bip) console.log('error fetching bip.')
    else return res.status(200).json({ bip })
    return res.status(200).json(null)
}

module.exports = getBip
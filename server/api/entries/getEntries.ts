const Entry = require('../../models/Entry')

const getEntries = async (req, res) => {
    
    const entries = await Entry
        .find({})
        .populate({
            path: 'author',
            select: 'username profileImage',
            populate: { path: 'profileImage' },
        })
        .sort({ createdAt: -1 })
    
    if (!entries) console.log('error fetching entries.')
    else return res.status(200).json({ entries })
    return res.status(200).json(null)
}

module.exports = getEntries
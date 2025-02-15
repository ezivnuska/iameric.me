const Memory = require('../../models/Memory')

const getMemoryThread = async (req, res) => {
    
    const memories = await Memory
        .find({})
        .populate({
            path: 'author',
            select: 'username profileImage',
            populate: { path: 'profileImage' },
        })
        .populate({
            path: 'image',
        })
        .sort({ createdAt: -1 })
    
    if (memories) return res.status(200).json({ memories })
    
    console.log('error fetching memories.')
    return res.status(200).json(null)
}

module.exports = getMemoryThread
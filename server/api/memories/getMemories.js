const Memory = require('../../models/Memory')

const getMemories = async (req, res) => {
    
    const memories = await Memory
        .find({})
        .populate({
            path: 'author',
            select: 'username',
        })
        .populate({
            path: 'image',
            select: 'filename width height',
        })
        .sort({ createdAt: -1 })
    
    if (memories) return res.status(200).json({ memories })
    
    console.log('error fetching memories.')

    return res.status(200).json(null)
}

module.exports = getMemories
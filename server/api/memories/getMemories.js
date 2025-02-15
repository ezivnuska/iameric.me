const Memory = require('../../models/Memory')

const getMemories = async (req, res) => {
    
    const memories = await Memory
        .find({})
        .select('_id')
        .sort({ createdAt: -1 })
    
    if (memories) return res.status(200).json({ memories })
    
    console.log('error fetching memories.')

    return res.status(200).json(null)
}

module.exports = getMemories
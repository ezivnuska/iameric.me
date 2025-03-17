const Memory = require('../../models/Memory')

const removeMemoryImage = async (req, res) => {
    
    const { memoryId } = req.body

    let memory = await Memory.findOneAndUpdate(
        { _id: memoryId },
        { $set: { image: null } },
        { new: true }
    )
    
    memory = await Memory
        .findOne({ _id: memoryId })
        .populate({
            path: 'author',
            select: 'username',
        })
        .populate({
            path: 'image',
            select: 'filename width height',
        })
    
    if (memory) return res.status(200).json({ memory })
    
    return res.status(200).json(null)
    
}

module.exports = removeMemoryImage
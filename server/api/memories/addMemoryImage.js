const Memory = require('../../models/Memory')

const addMemoryImage = async (req, res) => {
    
    const { memoryId, imageId } = req.body

    let memory = await Memory.findOneAndUpdate(
        { _id: memoryId },
        { $set: { image: imageId } },
        { new: true }
    )
    
    memory = await Memory
        .findOne({ _id: memory._id })
        .populate({
            path: 'author',
            select: 'username',
        })
        .populate({
            path: 'image',
            select: 'filename width height',
        })
    
    if (memory) return res.status(200).json({ memory })
    else return res.status(200).json(null)
}

module.exports = addMemoryImage
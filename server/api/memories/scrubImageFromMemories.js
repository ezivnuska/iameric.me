const Memory = require('../../models/Memory')

const scrubImageFromMemories = async imageId => {

    let memory = await Memory.findOneAndUpdate(
        { image: imageId },
        { $set: { image: null } },
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
    
    return memory
}

module.exports = scrubImageFromMemories
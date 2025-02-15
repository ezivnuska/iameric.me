const Memory = require('../../models/Memory')

const deleteMemoryById = async (req, res) => {
    
    let memory = await Memory
        .findById(req.params.id)
    
    if (!memory) {
        console.log('error deleting Memory.')
        return res.status(200).json(null)
    }
    
    // const threadId = memory.threadId
    
    memory = await Memory
        .findByIdAndDelete(req.params.id)
        
    console.log('Memory deleted', memory.body)

    // if (!threadId) {
    //     const deleted = await Memory
    //         .deleteMany({ threadId: req.params.id })
        
    //     console.log('related memories deleted', deleted.deletedCount)
    // }

    return res.status(200).json({ memory })
}

module.exports = deleteMemoryById
const Memory = require('../../models/Memory')

const deleteMemoryById = async (req, res) => {
    
    let memory = await Memory
        .findById(req.params.id)
    
    if (memory) {
        memory = await Memory
            .findByIdAndDelete(req.params.id)
        
        if (memory) {
            console.log('Memory deleted', memory)

            return res.status(200).json({ memory })
        }
    }

    console.log('error deleting Memory.')
    return res.status(200).json(null)
}

module.exports = deleteMemoryById
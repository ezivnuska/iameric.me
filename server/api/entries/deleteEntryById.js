const Entry = require('../../models/Entry')

const deleteEntryById = async (req, res) => {
    
    let entry = await Entry
        .findById(req.params.id)
    
    if (!entry) {
        console.log('error deleting entry.')
        return res.status(200).json(null)
    }
    
    const threadId = entry.threadId
    
    entry = await Entry
        .findByIdAndDelete(req.params.id)
        
    console.log('entry deleted', entry.text)

    if (!threadId) {
        const deleted = await Entry
            .deleteMany({ threadId: req.params.id })
        
        console.log('related entries deleted', deleted.deletedCount)
    }

    return res.status(200).json({ entry })
}

module.exports = deleteEntryById
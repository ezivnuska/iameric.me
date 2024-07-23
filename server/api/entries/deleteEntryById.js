const Entry = require('../../models/Entry')

const deleteEntryById = async (req, res) => {
    
    const entry = await Entry
        .findByIdAndDelete(req.params.id)
    
    if (!entry) {
        console.log('error deleting entry.')
        return res.status(200).json(null)
    }
    return res.status(200).json({ entry })
}

module.exports = deleteEntryById
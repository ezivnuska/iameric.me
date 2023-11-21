const Entry = require('../../models/Entry')

const createEntry = async (req, res) => {
    
    const { username, userId, text } = req.body
    const newEntry = await Entry
        .create({ username, userId, text })
        .then(result => {
            return res.json({
                entry: result,
            })
        })
    
    return newEntry
}

const getEntries = async (req, res) => {
    
    const entries = await Entry.find({})
    
    if (!entries) {
        console.log('error fetching entries.')
        return res.status(200).json(null)
    }

    return res.status(200).json({ entries })
}

const deleteEntryById = async (req, res) => {
    
    const entry = await Entry
        .findByIdAndDelete(req.params.id)
    
    if (!entry) {
        console.log('error deleting entry.')
        return res.status(200).json(null)
    }
    return res.status(200).json({ entry })
}

const deleteAllEntriesByUserId = async userId => {
    const { deleteCount } = await Entry
        .deleteMany({ userId })

    console.log('deleted entries', deleteCount)

    if (!deleteCount) {
        console.log('deleted zero entries.')
        return 0
    }

    console.log(`deleted ${deleteCount} entries.`)

    return deleteCount
}
module.exports = {
    createEntry,
    deleteAllEntriesByUserId,
    deleteEntryById,
    getEntries,
}
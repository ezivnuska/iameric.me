const Entry = require('../../models/Entry')

const createEntry = async (req, res) => {
    
    const { user, text } = req.body
    const entry = await Entry.create({ author: user, text })

    if (!entry) {
        console.log('Problem creating entry.')
        return res.status(200).json(null)
    } else {
        return res.json({ entry })
    }
}

const getEntries = async (req, res) => {
    
    const entries = await Entry
        .find({})
        .populate({
            path: 'author',
            select: 'username profileImage',
            populate: { path: 'profileImage' },
        })
    
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

const deleteAllEntriesByUserId = async user => {
    const { deleteCount } = await Entry
        .deleteMany({ user })

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
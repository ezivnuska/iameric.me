const Entry = require('../../models/Entry')

const createEntry = async (req, res) => {
    
    // pull values from request body
    const { author, text, threadId } = req.body

    // create a new mongo Entry doc
    const newEntry = await Entry.create({ author, text })

    // if error, notify console
    if (!newEntry) console.log('Problem creating entry.')
    else {
        if (threadId) {
            newEntry.threadId = threadId
            await newEntry.save()
        }
        // fetch new (populated) Entry
        const entry = await Entry
            .findOne({ _id: newEntry._id })
            .populate({
                path: 'author',
                select: 'username profileImage',
                populate: { path: 'profileImage' },
            })
            // return updated Entry document
            return res.json({ entry })
    }

    // upon failure, return null
    return res.status(200).json(null)
    
}

module.exports = createEntry
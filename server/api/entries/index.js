const createEntry = require('./createEntry')
const deleteAllEntriesByUserId = require('./deleteAllEntriesByUserId')
const deleteEntryById = require('./deleteEntryById')
const getEntries = require('./getEntries')
const getThread = require('./getThread')

module.exports = {
    createEntry,
    deleteAllEntriesByUserId,
    deleteEntryById,
    getEntries,
    getThread,
}
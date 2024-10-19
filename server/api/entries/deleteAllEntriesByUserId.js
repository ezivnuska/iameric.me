const Entry = require('../../models/Entry')

const deleteAllEntriesByUserId = async user => {
    console.log(`deleting entries for user id ${user._id}`)
    const { deleteCount } = await Entry.deleteMany({ user })

    if (!deleteCount) console.log('No entries were deleted.')
    else console.log(`deleted ${deleteCount} ${deleteCount !== 1 ? 'entries' : 'entry'}`)

    return deleteCount || 0
}

module.exports = deleteAllEntriesByUserId
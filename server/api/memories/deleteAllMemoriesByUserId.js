const Memory = require('../../models/Memory')

const deleteAllMemoriesByUserId = async user => {
    console.log(`deleting Memories for user id ${user._id}`)
    const { deleteCount } = await Memory.deleteMany({ user })

    if (!deleteCount) console.log('No Memories were deleted.')
    else console.log(`deleted ${deleteCount} ${deleteCount !== 1 ? 'Memories' : 'Memory'}`)

    return deleteCount || 0
}

module.exports = deleteAllMemoriesByUserId
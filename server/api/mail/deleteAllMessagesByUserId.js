const Message = require('../../models/Message')

const deleteAllMessagesByUserId = async user => {
    const { deleteCount } = await Message.deleteMany({ from: user })
    if (!deleteCount) console.log('No messages were deleted.')
    else console.log(`deleted ${deleteCount} message${deleteCount !== 1 ? 's' : ''}`)
    return deleteCount || 0
}

module.exports = deleteAllMessagesByUserId
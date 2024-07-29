const Entry = require('../../models/Entry')
const Address = require('../../models/Address')
const Message = require('../../models/Message')
const User = require('../../models/User')
const UserImage = require('../../models/UserImage')
const { removeAllImageFilesByUsername } = require('../images')

const deleteAccount = async (req, res) => {
    const { id } = req.body

    const entries = await Entry.find({ author: id })
    console.log('entries', entries)
    console.log('id to delete', id)
    console.log(`\ndeleting account: ${id}`)

    const deletedEntries = await Entry.deleteMany({ author: id })
    console.log('deletedEntries', deletedEntries)    
    if (!deletedEntries) {
        console.log('could not delete entries.')
    } else {
        console.log(`deleted ${deletedEntries.deletedCount} entries`)
    }

    const messages = await Message.find({ $or: [{ to: id }, { from: id }] })
    console.log('messages', messages)

    const deletedMessages = await Message.deleteMany({ $or: [{ from: id }, { to: id }] })
    console.log('deletedMessages', deletedMessages)    
    if (!deletedMessages) {
        console.log('could not delete messages.')
    } else {
        console.log(`deleted ${deletedMessages.deletedCount} messages`)
    }

    const deletedAddress = await Address.deleteOne({ user: id })
    if (!deletedAddress) {
        console.log('could not delete user address.')
    } else {
        console.log(`deleted ${deletedAddress.deletedCount} address`)
    }

    const deletedImages = await UserImage.deleteMany({ user: id })
    
    if (!deletedImages) {
        console.log('could not delete images.')
    } else {
        console.log(`deleted ${deletedImages.deletedCount} images`)
    }

    const deletedUser = await User.findOneAndDelete({ _id: id })
    
    if (!deletedUser) {
        console.log('Error deleting user.')
        return res.status(200).json({
            success: false,
            msg: 'Error closing account.'
        })
    }
    
    const imagesRemoved = removeAllImageFilesByUsername(deletedUser.username)
    if (imagesRemoved) console.log('Image files removed.')

    return res.status(200).json({
        id,
        msg: 'Account closed.'
    })
}

module.exports = deleteAccount
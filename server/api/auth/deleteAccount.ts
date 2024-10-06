const Address = require('../../models/Address')
const Bip = require('../../models/Bip')
const BipImage = require('../../models/BipImage')
const Entry = require('../../models/Entry')
const Message = require('../../models/Message')
const User = require('../../models/User')
const UserImage = require('../../models/UserImage')
const { removeUserAssetsByUsername } = require('../images')

const deleteAccount = async (req, res) => {
    const { id } = req.body

    const bips = await Bip.find({ user: id })
    console.log('bips', bips)
    console.log('id to delete', id)
    console.log(`\ndeleting account: ${id}`)

    
    if (bips && bips.length) {
        
        const bipIds = bips.map(b => b._id)

        const deletedBips = await Bip.deleteMany({ user: id })
        console.log('deletedBips', deletedBips)    
        if (!deletedBips) {
            console.log('could not delete bips.')
        } else {
            console.log(`deleted ${deletedBips.deletedCount} bips`)
        }

        const deletedBipImages = await BipImage.deleteMany({ bipId: { $in: bipIds } })
        
        if (!deletedBipImages) {
            console.log('could not delete bip images.')
        } else {
            console.log(`deleted ${deletedBipImages.deletedCount} bip images`)
        }
    }

    const entries = await Entry.find({ author: id })
    console.log('entries', entries)
    console.log('id to delete', id)
    console.log(`\ndeleting account: ${id}`)

    if (entries && entries.length) {

        const deletedEntries = await Entry.deleteMany({ author: id })
        console.log('deletedEntries', deletedEntries)    
        if (!deletedEntries) {
            console.log('could not delete entries.')
        } else {
            console.log(`deleted ${deletedEntries.deletedCount} entries`)
        }
    }

    const messages = await Message.find({ $or: [{ to: id }, { from: id }] })
    console.log('messages', messages)

    if (messages && messages.length) {

        const deletedMessages = await Message.deleteMany({ $or: [{ from: id }, { to: id }] })
        console.log('deletedMessages', deletedMessages)    
        if (!deletedMessages) {
            console.log('could not delete messages.')
        } else {
            console.log(`deleted ${deletedMessages.deletedCount} messages`)
        }
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
    
    const imagesRemoved = removeUserAssetsByUsername(deletedUser.username)
    if (imagesRemoved) console.log('Image files removed.')

    return res.status(200).json({
        id,
        msg: 'Account closed.'
    })
}

module.exports = deleteAccount
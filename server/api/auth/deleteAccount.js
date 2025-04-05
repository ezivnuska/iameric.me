const Address = require('../../models/Address')
const Bip = require('../../models/Bip')
const BipImage = require('../../models/BipImage')
const Bond = require('../../models/Bond')
const Entry = require('../../models/Entry')
const Message = require('../../models/Message')
const Memory = require('../../models/Memory')
const Post = require('../../models/Post')
const User = require('../../models/User')
const UserImage = require('../../models/UserImage')
const { removeUserAssetsByUsername } = require('../images')

const deleteAccount = async (req, res) => {

    const { id } = req.body

    const bips = await Bip.find({ user: id })

    if (bips && bips.length) {
        
        console.log(`deleting ${bips.length} bip${bips.length !== 1 && 's'}...`)
        const bipIds = bips.map(b => b._id)

        const deletedBips = await Bip.deleteMany({ user: id })

        if (!deletedBips) {
            console.log('could not delete bips.')
        } else {
            console.log(`deleted ${deletedBips.deletedCount} bip${deletedBips.deletedCount !== 1 && 's'}`)
        }

        const deletedBipImages = await BipImage.deleteMany({ bipId: { $in: bipIds } })
        
        if (!deletedBipImages) {
            console.log('could not delete bip images.')
        } else {
            console.log(`deleted ${deletedBipImages.deletedCount} bip image${deletedBipImages.deletedCount !== 1 && 's'}`)
        }
    }

    const entries = await Entry.find({ author: id })

    if (entries && entries.length) {

        console.log(`deleting ${entries.length} entr${entries.length !== 1 ? 'ies' : 'y'}...`)
        const deletedEntries = await Entry.deleteMany({ author: id })
        
        if (!deletedEntries) {
            console.log('could not delete entries.')
        } else {
            console.log(`deleted ${deletedEntries.deletedCount} entr${deletedEntries.deletedCount !== 1 ? 'ies' : 'y'}`)
        }
    }

    const posts = await Post.find({ author: id })
    
    if (posts && posts.length) {
        
        console.log(`deleting ${posts.length} post${posts.length !== 1 && 's'}...`)
        const deletedPosts = await Post.deleteMany({ author: id })
        
        if (!deletedPosts) {
            console.log('could not delete posts.')
        } else {

            console.log(`deleted ${deletedPosts.deleteCount} post${deletedPosts.deleteCount !== 1 && 's'}...`)
        }
    }

    const memories = await Memory.find({ author: id })
    
    if (memories && memories.length) {
        
        console.log(`deleting ${memories.length} post${memories.length !== 1 && 's'}...`)
        const deletedMemories = await Memory.deleteMany({ author: id })
        
        if (!deletedMemories) {
            console.log('could not delete memories.')
        } else {
            console.log(`deleted ${deletedMemories.deletedCount} memor${deletedMemories.deletedCount !== 1 ? 'ies' : 'y'}}`)
        }
    }

    const messages = await Message.find({ $or: [{ to: id }, { from: id }] })

    if (messages && messages.length) {
        
        console.log(`deleting ${messages.length} message${messages.length !== 1 && 's'}...`)
        const deletedMessages = await Message.deleteMany({ $or: [{ from: id }, { to: id }] })
        
        if (!deletedMessages) {
            console.log('could not delete messages.')
        } else {
            console.log(`deleted ${deletedMessages.deletedCount} message${deletedMessages.deletedCount !== 1 && 's'}`)
        }
    }

    const deletedAddress = await Address.deleteOne({ user: id })

    if (!deletedAddress) {
        console.log('could not delete user address.')
    } else {
        console.log(`deleted ${deletedAddress.deletedCount} address${deletedAddress.deleteCount !== 1 && 'es'}`)
    }

    const deletedImages = await UserImage.deleteMany({ user: id })
    
    if (!deletedImages) {
        console.log('could not delete images.')
    } else {
        console.log(`deleted ${deletedImages.deletedCount} image${deletedImages.deletedCount !== 1 && 's'}`)
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
    if (imagesRemoved) console.log('User asset directory removed.')

    return res.status(200).json({
        id,
        msg: 'Account closed.'
    })
}

module.exports = deleteAccount
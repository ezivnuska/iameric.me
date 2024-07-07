const Message = require('../../models/Message')

const createMessage = async (req, res) => {
    
    const { from, to, text } = req.body
    const newMessage = await Message.create({ from, to, text })

    if (!newMessage) {
        console.log('Problem creating message.')
        return res.status(200).json(null)
    }

    const message = await Message
        .findOne({ _id: newMessage._id })
        .populate({
            path: 'from',
            select: 'username profileImage',
            populate: { path: 'profileImage' },
        })
        .populate({
            path: 'to',
            select: 'username profileImage',
            populate: { path: 'profileImage' },
        })

    return res.json({ message })
}

const getMessage = async (req, res) => {

    const { id } = req.params
    
    const message = await Message
        .findOne({ _id: id })
        .populate({
            path: 'from',
            select: 'username profileImage',
            populate: { path: 'profileImage' },
        })
        .populate({
            path: 'to',
            select: 'username profileImage',
            populate: { path: 'profileImage' },
        })
        .sort({ createdAt: -1 })
    
    if (!message) {
        console.log('error fetching message.')
        return res.status(200).json(null)
    }

    return res.status(200).json({ message })
}

const getMessages = async (req, res) => {
    
    const messages = await Message
        .find({})
        .populate({
            path: 'from',
            select: 'username profileImage',
            populate: { path: 'profileImage' },
        })
        .populate({
            path: 'to',
            select: 'username profileImage',
            populate: { path: 'profileImage' },
        })
        .sort({ createdAt: -1 })
    
    if (!messages) {
        console.log('error fetching messages.')
        return res.status(200).json(null)
    }

    return res.status(200).json({ messages })
}

const deleteMessageById = async (req, res) => {
    
    const message = await Message
        .findByIdAndDelete(req.params.id)
    
    if (!message) {
        console.log('error deleting message.')
        return res.status(200).json(null)
    }
    return res.status(200).json({ message })
}

const deleteAllMessagesByUserId = async user => {
    const { deleteCount } = await Message
        .deleteMany({ from: user })

    console.log('deleted message', deleteCount)

    if (!deleteCount) {
        console.log('deleted zero message.')
        return 0
    }

    console.log(`deleted ${deleteCount} messages.`)

    return deleteCount
}
module.exports = {
    createMessage,
    deleteAllMessagesByUserId,
    deleteMessageById,
    getMessage,
    getMessages,
}
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

module.exports = createMessage
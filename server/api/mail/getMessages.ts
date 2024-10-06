const Message = require('../../models/Message')

const getMessages = async (req, res) => {

    const { id } = req.params
    
    const messages = await Message
        .find({
            $or: [
                { from: id },
                { to: id },
            ],
        })
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

module.exports = getMessages
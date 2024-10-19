const Message = require('../../models/Message')

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

module.exports = getMessage
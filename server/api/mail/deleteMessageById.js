const Message = require('../../models/Message')

const deleteMessageById = async (req, res) => {
    const { id } = req.params
    const message = await Message.findByIdAndDelete(id)
    if (!message) console.log('error deleting message.')
    else return res.status(200).json({ message })
    return res.status(200).json(null)
}

module.exports = deleteMessageById
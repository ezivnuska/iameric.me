const createMessage = require('./createMessage')
const deleteAllMessagesByUserId = require('./deleteAllMessagesByUserId')
const deleteMessageById = require('./deleteMessageById')
const getMessage = require('./getMessage')
const getMessages = require('./getMessages')
const sendMail = require('./sendMail')

module.exports = {
    createMessage,
    deleteAllMessagesByUserId,
    deleteMessageById,
    getMessage,
    getMessages,
    sendMail,
}
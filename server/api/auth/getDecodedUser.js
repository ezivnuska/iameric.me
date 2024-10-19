const jwt = require('jsonwebtoken')

const getDecodedUser = token => jwt.decode(token, process.env.JWT_SECRET)

module.exports = getDecodedUser
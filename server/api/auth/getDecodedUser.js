const jwt = require('jsonwebtoken')
const config = require('../../../config')
const SESSION_SECRET = process.env.JWT_SECRET || config.JWT_SECRET

const getDecodedUser = token => jwt.decode(token, SESSION_SECRET)

module.exports = getDecodedUser
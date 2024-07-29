const jwt = require('jsonwebtoken')
const config = require('../../../config')
const SESSION_SECRET = process.env.JWT_SECRET || config.JWT_SECRET

const createToken = ({
    _id,
    username,
    email,
    role,
}) => {
    // set expiration timestamp
    // const expiration = Math.floor(Date.now() / 1000) + ((60 * 60) * 24)
    const expiration = Math.floor(Date.now() / 1000) + ((60 * 1) * 1)
    return {
        token: jwt.sign({
            _id,
            username,
            email,
            role,
            exp: expiration,
        }, SESSION_SECRET, {}),
        exp: expiration,
    }
}

module.exports = createToken
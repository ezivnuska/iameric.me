const jwt = require('jsonwebtoken')

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
        }, process.env.JWT_SECRET, {}),
        exp: expiration,
    }
}

module.exports = createToken
const createToken = require('./createToken')
const getDecodedUser = require('./getDecodedUser')
const User = require('../../models/User')

const authenticate = async (req, res) => {
    
    const { token } = req.body
    
    console.log('authenticating saved token...')
    
    const userFromToken = getDecodedUser(token)

    if (!userFromToken) return res.status(200).json(null)

    console.log(`\n${userFromToken.username} was previously connected.\n`)
    
    const expired = (new Date(userFromToken.exp) - Date.now() > 0)
    if (expired) {
        console.log('token expired')
        return res.status(406).json({ userFromToken, error: 'token expired' })
    }

    const user = await User
        .findOne({ _id: userFromToken._id })
        .populate('profileImage', 'filename width height')
        .populate('location')

    if (!user) {
        console.log('failed to refresh user token')
        return res.status(200).json(null)
    }

    const data = createToken(user)
    
    user.token = data.token
    user.exp = data.exp

    await user.save()

    if (!user) {
        console.log('Error saving user with updated token')
        return res.status(200).json(null)
    }

    // return res.status(200).json({ user: getSanitizedUser(user) })
    return res.status(200).json({ user })
}

module.exports = authenticate
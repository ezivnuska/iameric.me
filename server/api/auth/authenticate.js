const createToken = require('./createToken')
const getDecodedUser = require('./getDecodedUser')
const User = require('../../models/User')

const authenticate = async (req, res) => {
    
    const { token } = req.body
    
    console.log('authenticating token...')
    
    const userFromToken = getDecodedUser(token)

    if (!userFromToken) return res.status(200).json(null)

    console.log(`\n${userFromToken.username} authenticated.\n`)
    
    const expired = (new Date(userFromToken.exp) - Date.now() > 0)
    
    if (expired) {

        console.log(`\n${userFromToken.username}'s token has expired.\n`)
        return res.status(406).json({ userFromToken, error: 'token expired' })
    }

    const user = await User
        .findOne({ _id: userFromToken._id })
        .select('address createdAt email exp profileImage role token username')
        .populate('profileImage', 'filename width height')
        .populate('address')

    if (!user) {
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

    return res.status(200).json({ user })
}

module.exports = authenticate
const bcrypt = require('bcrypt')
const createToken = require('./createToken')
const User = require('../../models/User')

const handleSignIn = async (req, res) => {
    const { email, password } = req.body
    console.log('email', email)
    
    const user = await User
        .findOne({ email })
        .populate('profileImage', 'filename width height')
        .populate('location')
        
    if (!user) {
        return res.status(200).json({ error: true, invalidField: 'email', msg: 'No user found with that email.' })
    }

    const passwordsMatch = await bcrypt.compare(password, user.password)

    if (!passwordsMatch) {
        return res.status(200).json({ error: true, invalidField: 'password', msg: 'Incorrect password.' })
    }
    
    const { token, exp } = createToken(user)

    user.token = token
    user.exp = exp
    
    await user.save()

    // const baseUser = getBaseUser(user)

    console.log(`\nUser signed in: ${user.username}`)
    
    return res.status(200).json({ user })
}

module.exports = handleSignIn
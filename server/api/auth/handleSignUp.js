const User = require('../../models/User')
const bcrypt = require('bcrypt')
const createUser = require('./createUser')

const handleSignUp = async (req, res) => {

    const { email, password, username } = req.body

    let user = await User.findOne({ email })

    if (user) {
        return res.status(200).json({ error: true, name: 'email', message: 'An account with that email already exists.' })
    }

    return bcrypt.genSalt(10, async (err, salt) => {
        
        bcrypt.hash(password, salt, async (err, hash) => {
            if (err) {
                console.log('err', err)
                return res.status(200).json({ error: true, message: err })
            }
            
            if (!hash) {
                return res.status(200).json({ error: true, message: 'Problem with hash.' })
            }

            user = await createUser(email, hash, username)

            if (!user) {
                return res.status(200).json({ error: true, message: 'Could not create new user.' })
            } else {
                return res.status(200).json({ user })
            }
        })
    })
}

module.exports = handleSignUp
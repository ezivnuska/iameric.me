const bcrypt = require('bcrypt')
const createUser = require('./createUser')

const handleSignUp = async (req, res) => {
    const { email, password, username, fiction } = req.body
    console.log('password', password)
    
    return bcrypt.genSalt(10, async (err, salt) => {
        console.log('salt', salt)
        bcrypt.hash(password, salt, async (err, hash) => {
            if (err) {
                console.log('error with hash', err)
                return res.status(200).json({ error: true, msg: err })
            }
            
            if (!hash) {
                console.log('problem with hash')
                return res.status(200).json({ error: true, msg: 'Problem with hash.' })
            }
            const user = await createUser(email, hash, username, fiction)

            if (!user) {
                console.log('problem with user')
                return res.status(200).json({ error: true, msg: 'Could not create new user.' })
            } else {
                console.log('new user created:', user)
                return res.status(200).json({ user })
            }
        })
    })
}

module.exports = handleSignUp
const User = require('../../models/User')
const bcrypt = require('bcrypt')
const createUser = require('./createUser')

// const { exec, spawn } = require('node:child_process')

// const body = 'test email'
// const subject = 'testing'
// const recipient = 'ezivnuska@gmail.com'
// const command = `echo "${body}" | s-nail -s "${subject}" "${recipient}"`

// exec(command, (error, stdout, stderr) => {
//     if (error) {
//         return console.error(`Error executing s-nail: ${error}`)
//     }
//     if (stderr) {
//          console.error(`stderr: ${stderr}`)
//     }
//     console.log(`Email sent successfully: ${stdout}`)
// })

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
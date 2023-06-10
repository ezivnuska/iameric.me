const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bcrypt = require('bcrypt')
const session = require('express-session')
const jwt = require('jsonwebtoken')
// const cookieParser = require('cookie-parser')
require('dotenv').config()
const SESSION_SECRET = process.env.JWT_SECRET || require('./config').JWT_SECRET
const db = process.env.DB_CONNECTION_STRING || require('./config').DB_CONNECTION_STRING
// const multer = require('multer')
// const formidable = require('formidable')
const fs = require('fs')
const gm = require('gm')
const { mkdirp } = require('mkdirp')
const im = gm.subClass({ imageMagick: true })
const path = require('path')
const PORT = process.env.PORT || require('./config').PORT
const IMAGE_PATH = process.env.IMAGE_PATH || 'assets/images'

const Entry = require('./models/Entry')
const Item = require('./models/Item')
const UserImage = require('./models/UserImage')
const User = require('./models/User')

const { createServer } = require('http')
const app = express()
const server = createServer(app)
// const { createProxyMiddleware } = require('http-proxy-middleware')

const imagePath = process.env.IMAGE_PATH ? process.env.IMAGE_PATH : './assets/images'

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors({ origin: true, credentials: true }))
app.use(express.static('dist'))
app.use('/assets', express.static('./assets'))
// app.use('/api', createProxyMiddleware({ target: 'https://iameric.me:4321', pathRewrite: { '^/api': '' } }));

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}))

const createToken = user => {
    const { _id, username, email } = user
    return jwt.sign({
        _id,
        username,
        email,
        exp: Math.floor(Date.now() / 1000) + ((60 * 60) * 24),
    }, SESSION_SECRET, {})
}

const getDecodedUser = token => jwt.decode(token, SESSION_SECRET)

app.post('/user/get', (req, res) => checkForUser(req, res))

const checkForUser = async (req, res) => {
    const { email } = req.body
    if (!email) res.status(200).json({ msg: 'No email received.', user: null })
    console.log('> checking for user with email:', email)
    const userExists = await User
        .findOne({ email })
        .then(result => {
            console.log('User found (result):', result)
            if (!result) return false
            return true
        })
        .catch(err => {
            console.log('> error finding user from email.', err)
            return false
        })
    
    if (!userExists) {
        console.log('> no user found.')
        return res.json({ msg: 'No user found with that email.', user: false })
    }
    console.log('> user exists:', userExists)
    return res.json({ msg: 'User found.', user: true })
}

app.post('/signin', (req, res) => handleSignin(req, res))

const handleSignin = async (req, res) => {
    const { email, password } = req.body
    
    if (!email || !password)
        return res.json({ msg: 'Need email and password.' })
    
        console.log('> signin with email:', email)
    
    const user = await userFromEmail(email)
    if (!user) {
        console.log('> no user found.')
        return res.json({ invalid: 'email', msg: 'No user found with that email.' })
    }
    
    console.log('> user found:', user.username)
    
    const userVerified = await isMatch(password, user.password)
    if (!userVerified)
        return res.json({ invalid: 'password', msg: 'Could not verify user.' })
    
    console.log('> user verified:', user.username)
    
    const verifiedUser = await updatedUser(user)
    if (!verifiedUser)
        return res.json({ msg: 'Error updating user token.' })
    
    return res.json({
        user: verifiedUser,
        msg: 'Signin successful.',
    })
}

const isMatch = (password, hashedPassword) => bcrypt
    .compare(password, hashedPassword)
    .then(result => result)

const userFromEmail =  async email => {
    const user = await User
        .findOne({ email })
        .then(result => {
            if (!result) return null
            const { _id, email, username, dataURI, password } = result
            return { _id, email, username, dataURI, password }
        })

    return user
}

const updatedUser = async user => {
    const { _id } = user
    const token = createToken(user)
    return await User
        .findOneAndUpdate({ _id }, { $set: { token } }, { new: true } )
        .then(newUser => {
            if (!newUser) return null
            const { _id, email, username, role, token, profileImage } = newUser
            return { _id, email, username, role, token, profileImage }
        })
        .catch(err => {
            console.log('Error setting user token on sign in.', err)
            return null
        })

}

app.post('/signup', (req, res) => handleSignup(req, res))

const handleSignup = async (req, res) => {
    const { password } = req.body
    bcrypt.hash(password, 10, (err, hashedPW) => {
        if (err) {
            console.log('Error hashing pw', err)
            return null
        }
        const user = req.body
        const email = user.email
        console.log('-->', user)
        return User
            .findOne({ email })
            .then(result => {
                if (result) {
                    console.log('A user with that email already exists.')
                    return res.status(200).json({
                        success: false,
                    })
                }
                else {
                    user.password = hashedPW
                    return User
                        .create(user)
                        .then(newUser => {
                            if (!newUser) throw new Error()
                            // req.cookies.user = newUser
                            const token = createToken(newUser)
                            console.log('token', token)
                            return User
                                .findOneAndUpdate({ _id: newUser._id }, { $set: { token } }, { new: true } )
                                .then(updatedUser => {
                                    const { _id, email, username, role, profileImage, token } = updatedUser
                                    const user = { _id, email, username, role, profileImage, token }
                                    return res.status(200).json({ user })
                                })
                                .catch(err => {
                                    console.log('Error setting user token on sign up.', err)
                                    return res.json({
                                        success: false,
                                        err,
                                    })
                                })
                        })
                        .catch(err => {
                            console.log('Error creating new user.', err)
                            return null
                        })
                }
            })
            .catch(err => console.log('Error: User already exists.', err))
    })

}

// app.post('/signinx', (req, res) => {
//     const { email, password } = req.body
//     User
//         .findOne({ email })
//         .then(result => {
//             const { _id, email, username, dataURI } = result
//             const user = { _id, email, username, dataURI }
//             const hashedPW = result.password
//             bcrypt
//                 .compare(password, hashedPW)
//                 .then(result => {
//                     if (!result) {
//                         return res.json({
//                             success: false,
//                             err: 'Verification failed. Please try again.',
//                         })
//                     }
                    
//                     const token = createToken(user)
//                     // req.cookies.user = user
//                     User
//                         .findOneAndUpdate({ _id }, { $set: { token } }, { new: true } )
//                         .then(newUser => {
//                             const { _id, email, username, profileImage } = newUser
//                             // req.cookies.user = newUser
//                             res.json({
//                                 success: true,
//                                 user: { _id, email, username, token, profileImage },  
//                             })
                            
//                         })
//                         .catch(err => {
//                             console.log('Error setting user token on sign in.', err)
//                             res.json({
//                                 success: false,
//                                 err,
//                             })
//                         })
//                 })
//                 .catch(err => {
//                     console.log('Failed when comparing password', password, hashedPW, err)
//                     res.json({
//                         success: false,
//                         err,
//                     })
//                 })
//         })
//         .catch(err => res.json({msg: 'Failed to find the user'}))
// })

app.post('/authenticate', (req, res) => {
    const { token } = req.body
    console.log('authenticating token...', token)
    if (token) {
        const user = getDecodedUser(token)
        console.log('decoded user', user)
        const expired = (new Date(user.exp) - Date.now() > 0)
        if (expired) {
            console.log('token expired')
            return res.status(200).json({ user, error: 'token expired' })
        } else {
            const newToken = createToken(user)
            console.log('token valid. refreshing...')
            User
                .findOneAndUpdate({ token }, { $set: { token: newToken } }, { new: true })
                .then(refreshedUser => {
                    console.log('token refreshed.\n')
                    return res.status(200).json({
                        user: refreshedUser,
                    })
                })
                .catch(err => {
                    console.log('Error refreshing user token. newToken, error:', newToken, err)
                })
        }
    } else {
        res.status(200).json({ user: null, error: 'auth token required'})
    }
})

const clearAllEntries = async userId => await Entry
        .deleteMany({ userId })
        .then(result => result.deletedCount)
        .catch(err => {
            console.log('Error clearing entries', err)
            return 0
        })

const clearUser = async _id => await User
    .findOneAndUpdate({ _id }, { $set: { token: null, } }, { new: true })
    .then(user => user)
    .catch(err => {
        console.log('Error clearing user on sign out', err)
        return null
    })

const signoutUser = async _id => {

    const updatedUser = await clearUser(_id)
    if (!updatedUser) {
        console.log('no user found to signout.')
        return null
    }
    if (updatedUser.role === 'guest') {
        const entriesCleaned = await clearAllEntries(updatedUser._id)
        console.log('entriesCleaned', entriesCleaned)
    }
    return updatedUser
        // Entry
        //     .deleteMany({ userId: user._id })
        //     .then(result => {
        //         console.log('Guest entries deleted.', result.deletedCount)
        //         res.json({
        //             success: true,
        //             msg: 'Guest entries deleted.',
        //         })
        //     })
    }
    //  else {
        // res.json({
        //     success: true,
        //     msg: 'Guest signed out.',
        // })
    // }
// }

const handleSignout = async (req, res) => {
    const signedOutUser = await signoutUser(req.body._id)
    if (!signedOutUser) return res.json({ success: false, msg: 'Could not sign out user.' })
    return res.json({ success: true, user: signedOutUser, msg: 'User signed out.' })
}

app.post('/signout', (req, res) => handleSignout(req, res))

app.post('/signoutx', (req, res) => {
    const { _id } = req.body
    console.log('_id:', _id)
    // const user = getDecodedUser(token)
    // req.cookies.user = null
    User
        .findOneAndUpdate({ _id }, { $set: { token: null, } }, { new: true, })
        .then(user => {
            console.log('user', user)
            if (user.role === 'guest') {
                Entry
                    .deleteMany({ userId: user._id })
                    .then(result => {
                        console.log('Guest entries deleted.', result.deletedCount)
                        res.json({
                            success: true,
                            msg: 'Guest entries deleted.',
                        })
                    })
            } else {
                res.json({
                    success: true,
                    msg: 'Guest signed out.',
                })
            }
        })
        .catch(err => {
            console.log('Error deleting token on sign out', err)
            res.json({
                success: false,
                err,
            })
        })
})

app.get('/users', (req, res) => {
    User
        .find({})
        .then(users => res.json({ users }))
})

app.post('/entry', (req, res) => {
    const { body } = req
    const { username, userId, text } = body
    const newEntry = { username, userId, text }
    Entry
        .create(newEntry)
        .then(result => {
            return res.json({
                entry: result,
            })
        })
})

app.get('/entries', (req, res) => {
    console.log('loading all entries...')
    Entry
        .find({})
        .then(entries => {
            console.log('returning loaded entries.')
            res.json({ entries })
        })
})

app.delete('/entry/delete', async (req, res) => {
    console.log('deleting entry...')
    const entry = await Entry.findByIdAndDelete(req.body.id)
    console.log('Entry deleted.', entry)
    return res.json({ entry })
})

// [menu] item

app.post('/item', (req, res) => {
    const { body } = req
    const { merchantId, title } = body
    const newItem = { title, merchantId }
    return Item
        .create(newItem)
        .then(item => res.json({ item }))
})

app.get('/items', (req, res) => {
    console.log('loading all items...')
    return Item
        .find({})
        .then(items => res.json({ items }))
})

app.delete('/item/delete', (req, res) => {
    return Item
        .findByIdAndDelete(req.body.id)
        .then(item => res.json({ item }))
})

app.get('/users/:id', async (req, res, next) => {
    const { id } = req.params
    User
        .findOne({ _id: id})
        .then(result => {
            res.json({
                user: result,
            })
        })
})

app.get('/users/self/:id', async (req, res, next) => {
    const _id = req.params.id
    User
        .findOne({ _id })
        .then(({ profileImage }) => res.json({ profileImage }))
})

const writeFileToPath = async (file, pathname) => {
    const regex = /^data:.+\/(.+);base64,(.*)$/
    const matches = file.match(regex)
    const ext = matches[1]
    const data = matches[2]
    const buffer = Buffer.from(data, 'base64')
    const username = pathname.split('/').pop()
    let dirExists = fs.existsSync(pathname)
    if (!dirExists) mkdirp.sync(pathname)
    dirExists = fs.existsSync(pathname)
    const filename = `${username}-${Date.now()}.${ext}`
    const filepath = `${pathname}/${filename}`
    console.log('filepath to write...', filepath)
    let returnValue = filename
    try {
        fs.writeFile(filepath, buffer, err => {
            if (err) console.log('Error writing file:', err)
        })
    } catch {
        console.log('CATCH: Error writing file.')
        returnValue = null
    }
    return returnValue
}

app.post(
    '/upload/avatar',
    async (req, res) => {
        const { dataurl, username } = req.body
        const imagePath = process.env.IMAGE_PATH || './assets/images'
        const pathname = `${imagePath}/${username}`
        console.log('writing to pathname', pathname)
        const filename = await writeFileToPath(dataurl, pathname)
        console.log('file written', filename)
        if (!filename) {
            console.log('Error: Cannot write file to path.')
            return res.status(400).json({ error: 'Error writing file to path.' })
        } else {
            User
                .findOne({ username })
                .then(({ _id }) => {
                    UserImage
                        .create({ userId: _id, filename })
                        .then(image => {
                            User
                                .findOneAndUpdate({ _id }, { $set: { profileImage: image.filename } }, { new: true })
                                .then(updatedUser => {
                                    const { _id, email, username, profileImage } = updatedUser
                                    res.status(200).json({ user: { _id, email, username, profileImage } })
                                })
                                .catch(err => {
                                    console.log('Error updating user profile image', err)
                                    res.status(400).json({ error: 'Error updating user profile image' })
                                })
                        })
                        .catch(err => {
                            console.log('Error updating user profile image', err)
                            res.status(400).json({ error: 'Error updating user profile image' })
                        })
                })
                .catch(err => {
                    console.log('error doing UserImage stuff', err)
                    return res.status(400).json({ error: 'Error doing UserImage stuff' })
                })
        }    
})

const removeImageFile = filepath => fs.rm(filepath, () => console.log('removed file at path', filepath))
const removeAllImages = username => fs.rmSync(`${IMAGE_PATH}/${username}`, { recursive: true, force: true })
app.post('/images/delete', (req, res) => {
    const { _id, filename, userId, username } = req.body
    const filepath = `${imagePath}/${username}/${filename}`
    console.log('filepath to remove:', filepath)
    User
        .findOne({ _id: userId })
        .then(user => {
            if (user.profileImage === filename) {
                console.log(`Image to delete is currently used as avatar. Updating user.profileImage before deleting file: ${filename}`)
                User
                    .findOneAndUpdate({ _id: userId }, { $set: { profileImage: null } }, { new: true })
                    .then(user => {
                        UserImage
                            .findOneAndRemove({ _id })
                            .then(result => {
                                console.log('image entry removed from db', result.filename)
                                removeImageFile(filepath)
                                res.status(200).json({ user })
                            })
                    })
                    .catch(err => console.log('err', err))
            } else {
                UserImage
                    .findOneAndRemove({ _id })
                    .then(result => {
                        console.log('image entry removed from db', result.filename)
                        fs.rm(filepath, () => {
                            console.log('and also removed file at path', filepath)
                            console.log('returning success')
                            res.status(200).json({ success: true })
                        })
                    })
            }

        })
        .catch(err => console.log('error', err))
})

app.post('/user/avatar/', (req, res) => {
    const { _id, filename } = req.body
    User
        .findOneAndUpdate({ _id }, { $set: { profileImage: filename } }, { new: true })
        .then(updatedUser => {
            const { _id, email, username, profileImage } = updatedUser
            res.status(200).json({ user: { _id, email, username, profileImage } })
        })
        .catch(err => {
            console.log('Error setting avatar', err)
            res.status(400).json({ error: err })
        })
})

app.get('/user/images/:id', (req, res) => {
    const userId = req.params.id
    UserImage
        .find({ userId })
        .then(images => {
            res.status(200).json({ images })
        })
        .catch(err => {
            console.log('Error getting images', err)
            res.status(400).json({ error: err })
        })
})

app.post('/unsubscribe', (req, res) => {
    console.log('unsubbing', req.body)
    const { _id } = req.body
    console.log('unsubbing', _id)
    Entry
        .deleteMany({ userId: _id })
        .then(({ deletedCount }) => console.log('deleted entries', deletedCount))
        .catch(err => console.log('Error deleting entries', err))
    
    UserImage
        .deleteMany({ userId: _id })
        .then(({ deletedCount }) => console.log('deleted images', deletedCount))
        .catch(err => console.log('Error deleting images', err))
    
    // removeAllImages()

    User
        .deleteOne({ _id })
        .then(result => {
            console.log('User deleted.', result)
            removeAllImages(result.username)
        })
        .catch(err => console.log('Error deleting user', err))

    res.status(200).json({
        msg: 'Account closed.'
    })
})

mongoose.Promise = global.Promise
mongoose.set('strictQuery', false)
mongoose
    .connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        keepAlive: true,
    })
    .then(() => console.log(`MongoDB connected to\n${db}\n\nHello World`))
    .catch(err => console.log('Error connecting to database', err))

server.listen(PORT, () => console.log(`\n\n\nserver listen on ${PORT}\n`))
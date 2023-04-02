const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bcrypt = require('bcrypt')
const session = require('express-session')
const jwt = require('jsonwebtoken')
// const cookieParser = require('cookie-parser')
require('dotenv').config()
const SESSION_SECRET = process.env.JWT_SECRET// || require('./config').JWT_SECRET
const db = process.env.DB_CONNECTION_STRING// || require('./config').DB_CONNECTION_STRING
// const multer = require('multer')
// const formidable = require('formidable')
const fs = require('fs')
const gm = require('gm')
const { mkdirp } = require('mkdirp')
const im = gm.subClass({ imageMagick: true })
const path = require('path')
const PORT = process.env.PORT
const IMAGE_PATH = process.env.IMAGE_PATH || 'assets/images'

const Entry = require('./models/Entry')
const UserImage = require('./models/UserImage')
const User = require('./models/User')

const { createServer } = require('http')
const app = express()
const server = createServer(app)

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors({ origin: true, credentials: true }))
app.use(express.static('dist'))
app.use('/assets', express.static('./assets'))
// app.use(cookieParser())

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

// JWT Middleware
// app.use(async (req, res, next) => {
//     const token = req.cookies.token ? req.cookies.token : null
//     console.log('token', token)
//     if (token !== null) {
//         try {
//             const currentUser = await jwt.verify(token, process.env.JWT_SECRET)
//             req.currentUser = currentUser
//         } catch (err) {
//             res.clearCookie('token')
//         }
//     }
//     next()
// })

app.post('/api/signup', (req, res) => {
    bcrypt.hash(req.body.password, 10, (err, hashedPW) => {
        if (err) {
            res.status(422).json({'error': err});
        } else {
            const user = req.body;
            const email = user.email
            User
                .findOne({ email })
                .then(result => {
                    if (result) {
                        alert('A user with that email already exists.')
                        res.status(200).json({
                            success: false,
                        })
                    }
                    else {
                        user.password = hashedPW;
                        User
                            .create(user)
                            .then(newUser => {
                                if (!newUser) throw new Error()
                                // req.cookies.user = newUser
                                const token = createToken(newUser)

                                User
                                    .findOneAndUpdate({ _id: newUser._id }, { $set: { token } }, { new: true } )
                                    .then(updatedUser => {
                                        const { _id, email, username, profileImage } = updatedUser
                                        const user = { _id, email, username, profileImage }
                                        res.status(200).json({ user })
                                    })
                                    .catch(err => {
                                        console.log('Error setting user token on sign up.', err)
                                        res.json({
                                            success: false,
                                            err,
                                        })
                                    })
                            })
                            .catch(err => console.log('Error creating new user.', err))
                    }
                })
                .catch(err => console.log('Error: User already exists.'))
        }
    })
})

app.post('/api/signin', (req, res) => {
    const { email, password } = req.body
    User
        .findOne({ email })
        .then(result => {
            const { _id, email, username, dataURI } = result
            const user = { _id, email, username, dataURI }
            const hashedPW = result.password
            bcrypt
                .compare(password, hashedPW)
                .then(result => {
                    if (!result) throw new Error()
                    
                    const token = createToken(user)
                    // req.cookies.user = user
                    User
                        .findOneAndUpdate({ _id }, { $set: { token } }, { new: true } )
                        .then(newUser => {
                            const { _id, email, username, profileImage } = newUser
                            // req.cookies.user = newUser
                            res.json({
                                success: true,
                                user: { _id, email, username, token, profileImage },  
                            })
                            
                        })
                        .catch(err => {
                            console.log('Error setting user token on sign in.', err)
                            res.json({
                                success: false,
                                err,
                            })
                        })
                })
                .catch(err => console.log('Failed when comparing password', password, hashedPW, err))
        })
        .catch(err => res.json({msg: 'Failed to find the user'}))
})

app.post('/api/authenticate', (req, res) => {
    console.log('authenticating token...')
    const { body } = req
    const { token } = body
    if (token) {
        const user = getDecodedUser(token)
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
                .catch(err => console.log('Error refreshing user token', newToken, err))
        }
    } else {
        res.status(200).json({ user: null, error: 'auth token required'})
    }
})

app.post('/api/signout', (req, res) => {
    const { body } = req
    // console.log('body', body)
    const { _id } = body
    // const user = getDecodedUser(token)
    // req.cookies.user = null
    User
        .findOneAndUpdate({ _id }, { $set: { token: null, } }, { new: true, })
        .then(result => {
            
            res.json({
                success: true,
                msg: 'User Signed Out',
            })
        })
        .catch(err => {
            console.log('Error deleting token on sign out', err)
            res.json({
                success: false,
                err,
            })
        })
})

app.get('/api/users', (req, res) => {
    User
        .find({})
        .then(result => {
            return res.json({
                users: result,
            })
        })
})

app.post('/api/entry', (req, res) => {
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

app.get('/api/entries', (req, res) => {
    Entry
        .find({})
        .then(result => {
            return res.json({
                entries: result,
            })
        })
})

app.post('/api/entry/delete', (req, res) => {
    const { id } = req.body
    Entry
        .findOneAndDelete(id)
        .then(entry => {
            return res.json({
                entry,
            })
        })
})

app.get('/api/users/:id', async (req, res, next) => {
    const { id } = req.params
    User
        .findOne({ _id: id})
        .then(result => {
            res.json({
                user: result,
            })
        })
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
    '/api/upload/avatar',
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

app.post('/api/images/delete', (req, res) => {
    const { _id, filename, userId, username } = req.body
    const imagePath = process.env.IMAGE_PATH ? process.env.IMAGE_PATH : './assets/images'
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
                                fs.rm(filepath, () => {
                                    console.log('and also removed file at path', filepath)
                                    res.status(200).json({ user })
                                })
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

app.post('/api/user/avatar/', (req, res) => {
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

app.get('/api/user/images/:id', (req, res) => {
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
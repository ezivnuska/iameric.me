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
const multer = require('multer')
// const formidable = require('formidable')
const fs = require('fs')
const gm = require('gm')
const { mkdirp } = require('mkdirp')
const im = gm.subClass({ imageMagick: true })
const path = require('path')
const PORT = process.env.PORT

const Entry = require('./models/Entry')
const UserImage = require('./models/UserImage')
const User = require('./models/User')

const { createServer } = require('http')
const app = express()
const server = createServer(app)

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors({ origin: true, credentials: true }))
// app.use(express.static('web-build'))
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
                                res.status(200).json({
                                    success: true,
                                    user: newUser,
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
                            const { _id, email, username, dataURI } = newUser
                            // req.cookies.user = newUser
                            res.json({
                                success: true,
                                user: { _id, email, username, token, dataURI },  
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
    const { token } = body.user
    // const user = getDecodedUser(token)
    // req.cookies.user = null
    User
        .findOneAndUpdate({ token }, { $set: { token: null, } }, { new: true, })
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

// const storage = multer.diskStorage({
//     destination: async (req, file, callback) => {
//         callback(null, `${filepath}`)
//     },
//     filename: (req, file, callback) => {
//         let ext = path.extname(file.originalname).length ? path.ext(file.originalname) : '.png'
//         callback(null, `avatar${ext}`)
//     }
// })

const upload = username => {
    console.log('multering')
    const dest = path.join(__dirname, `./src/assets/images/users/${username}`)
    console.log('dest', dest)

    const storage = multer.diskStorage({
        destination: async (req, file, callback) => {
            callback(null, `${dest}`)
        },
        filename: (req, file, callback) => {
            let ext = path.extname(file.originalname).length ? path.ext(file.originalname) : '.png'
            callback(null, `avatar${ext}`)
        }
    })
    return multer({
        storage,
        limits: {
            fileSize: 2000000,
        },
        onFileSizeLimit: file => {
            res.json({
                message: 'Upload failed. File size too large.',
                status: MARankings.Enums.Status.FILE_TOO_LARGE,
            })
        },
    }).single('file')
}

const pathExists = pathname => fs.existsSync([pathname])

const makePath = async pathname => {
    console.log('making pathname', pathname)
    return mkdirp(pathname).then(made => made)
}

const getPath = username => path.join(__dirname, `./src/assets/images/users/${username}`)
// {
//     console.log('getting path for username', username)
//     const pathname = path.join(__dirname, `./src/assets/images/users/${username}`)
//     console.log('path for username', pathname)
//     return fs.access(pathname, async err => {
//         if (err) {
//             console.log('Error making directory', err)
//             return null
//         }
//         console.log('pathname created?', pathname)
//         if (!pathname) {
//             await mkdirp(pathname)
//                 .then(made => {
//                     console.log('made', made)
//                     return made
//                 })
//         }
//         console.log('pathname already exists', pathname)
//         return pathname
//     })
    // console.log('checking for user image directory:', pathname)
    // let existingPath = pathExists(pathname)
    // console.log('path exists', existingPath)
    // if (!existingPath) {
    //     let made = await makePath(pathname)
    //     console.log('made', made)
    // }
    // existingPath = pathExists(pathname)
    // console.log('exists', existingPath)
    // return pathname
// }

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
    console.log('dirExists', dirExists)
    const filename = `${username}-${Date.now()}.${ext}`
    const filepath = `${pathname}/${filename}`
    console.log('filepath to write', filepath)
    let returnValue = filename
    try {
        fs.writeFile(filepath, buffer, err => {
            if (err) console.log('Error writing file:', err)
            console.log('file written', returnValue)
        })
    } catch {
        console.log('Error writing file (catch)')
        returnValue = null
    }
    return returnValue
}

app.post(
    '/api/upload/avatar',
    // upload,
    async (req, res) => {
        const { dataurl, username } = req.body
        const pathname = getPath(username)
        const filename = await writeFileToPath(dataurl, pathname)
        if (!filename) {
            console.log('Error: Cannot write file to path.')
            return res.status(400).json({ error: 'Error writing file to path.' })
        } else {
            console.log('image saved', filename)
            return User
                .findOne({ username })
                .then(({ _id }) => {
                    UserImage
                        .create({
                            userId: _id,
                            filename,
                        })
                        .then(image => {
                            console.log('new image created and saved', image)
                            User
                                .findOneAndUpdate({ _id }, { $set: { profileImage: filename } }, { new: true })
                                .then(updatedUser => res.status(200).json({ user: updatedUser }))
                                .catch(err => {
                                    console.log('Error updating user profile image', err)
                                    return res.status(400).json({ error: 'Error updating user profile image' })
                                })
                        })
                })
                .catch(err => {
                    console.log('error doing UserImage stuff', err)
                    return res.status(400).json({ error: 'Error doing UserImage stuff' })
                })
        }    
})

app.post('/api/delete', (req, res) => {
    const { fileToRemove, username } = req.body
    const filepath = `./src/assets/images/users/${username}/${fileToRemove}`
    console.log('filepathToRemoveFromServer:', filepath)
    fs.rm(filepath, () => {
        console.log('removed file at path', filepath)
        res.status(200).json({
            deletedFile: filepath,
        })
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
    .then(() => console.log(`MongoDB connected to\n${db}\n\n`))
    .catch(err => console.log('Error connecting to database', err))

server.listen(PORT, () => console.log(`\n\n\nserver listen on ${PORT}\n`))
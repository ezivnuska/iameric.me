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
const Location = require('./models/Location')
const Product = require('./models/Product')
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
    const { _id, username, email, role } = user
    return jwt.sign({
        _id,
        username,
        email,
        role,
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
    console.log('signing in...', email)
    
    const user = await User.findOne({ email })

    if (!user)
        return res.status(406).json({ invalid: 'email', msg: 'No user found with that email.' })
    console.log('user found', user.username)
    const passwordsMatch = await bcrypt.compare(password, user.password)

    if (!passwordsMatch)
        return res.status(406).json({ invalid: 'password', msg: 'Could not verify user.' })

    user.token = createToken(user)

    await user.save()

    const { _id, username, dataURI, token, role } = user
    
    return res.status(200).json({ _id, email: user.email, username, dataURI, password: user.password, token, role })
}

const userFromEmail = async emailAddress => {
    const user = await User
        .findOne({ email: emailAddress })
        .then(u => u)

    const passwordsMatch = await bcrypt.compare(password, user.password)

    if (!passwordsMatch)
        return res.status(406).json({ invalid: 'password', msg: 'Could not verify user.' })

    user.token = createToken(user)
    await user.save()

    const { _id, email, username, dataURI, password, token, role } = user
    return { _id, email, username, dataURI, password, token, role }
}

app.post('/signup', (req, res) => handleSignup(req, res))

const createUser = async user => {
    
    const userExists = await User.
        findOne({ email: user.email })
    
    if (userExists) {
        console.log('A user with that email already exists.')
        return res.status(200).json({ success: false })
    }

    const newUser = await User.create(user)

    if (!newUser) throw new Error(`Error creating user: ${newUser}`)
    
    await newUser.save()
    
    const newToken = createToken(newUser)
    
    const updatedUser = await User.
        findOneAndUpdate({ _id: newUser._id.toString() }, { $set: { token: newToken } }, { new: true })

    const { _id, email, username, role, profileImage, images, token } = updatedUser

    return { _id, email, username, role, profileImage, images, token }
}

const handleSignup = async (req, res) => {
    const { password } = req.body
    return bcrypt.hash(password, 10, async (err, hashedPW) => {
        if (err) return res.status(406).json({ success: false })

        const user = await createUser({...req.body, password: hashedPW})

        if (!user) return res.status(406).json({ success: false })

        return res.status(200).json({ user })
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
    console.log('authenticating token...')
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

const clearUserToken = async _id => await User
    .findOneAndUpdate({ _id }, { $set: { token: null, } }, { new: true })
    .then(user => user)
    .catch(err => {
        console.log('Error clearing user on sign out', err)
        return null
    })

const signoutUser = async _id => {
    const user = await clearUserToken(_id)
    if (!user) {
        console.log('no user found to signout.')
        return null
    }
    if (user.role === 'guest') await clearAllEntries(user._id)
    
    return user
}

const handleSignout = async (req, res) => {
    const signedOutUser = await signoutUser(req.body._id)
    if (!signedOutUser) return res.json({ success: false, msg: 'Could not sign out user.' })
    return res.json({ success: true, user: signedOutUser, msg: 'User signed out.' })
}

app.post('/signout', (req, res) => handleSignout(req, res))

app.get('/users', (req, res) => {
    User
        .find({})
        .then(users => res.json({ users }))
})

app.get('/vendors', async (req, res) => await User.
    find({ role: 'vendor' }).
    populate('profileImage', 'filename').
    then(vendors => {
        // console.log('vendors', vendors)
        const result = vendors.map(v => {
            const { _id, profileImage, username, } = v
            return { _id, profileImage: profileImage.filename, username }
        })
        // console.log('result', result)
        return res.json({ vendors: result })
    })
)

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

// location

app.post('/location', async (req, res) => {
    const { body } = req
    const { userId, username, address1, address2, city, state, zip } = body
    const newLocation = { userId, username, address1, address2, city, state, zip }
    const location = await Location
        .findOne({ userId })
        .then(response => {
            return response
        })
    if (location) {
        return await Location
            .findOneAndUpdate({ _id: location._id }, { $set: newLocation }, { new: true })
            .then(data => res.json({ location: data }))
            .catch(err => res.json({ location: null, err }))
    }
    return await Location
        .create(newLocation)
        .then(data => res.json({ location: data }))
        .catch(err => res.json({ location: null, err }))
})

app.get('/user/location/:userId', async (req, res) => {
    const { userId } = req.params
    return await Location
        .findOne({ userId })
        .then(response => {
            if (!response) return res.json({ location: null })
            return res.json({ location: response })
        })
        .catch(err => res.json({ location: null, err }))
})

// [menu] product

app.post('/product', async (req, res) => {
    const { body } = req
    const { _id, price, title, desc, vendorId, blurb, category } = body
    const newItem = { price, title, desc, vendorId, blurb, category }
    return _id
        ? await Product
            .findOneAndUpdate({ _id }, { $set: { price, title, desc, blurb, category } }, { new: true } )
            .then(item => res.json({ item }))
        : await Product
            .create(newItem)
            .then(item => res.json({ item }))
})

app.get('/products/:id', async (req, res) => {
    const { id } = req.params
    const items = await Product.
        find({ vendorId: id })

    return res.status(200).json({ items })
})

app.delete('/products/delete', async (req, res) => {
    const item = await Product
        .findByIdAndDelete(req.body.id)
    return res.status(200).json({ item })
})

app.get('/users/:id', async (req, res, next) => {
    const _id = req.params.id
    const user = User.
        findOne({ _id })
        
    return res.status(200).json({ user })
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
        const { _id, dataurl } = req.body
        const user = await User.findOne({ _id })
        console.log('\nuser', user)
        
        const imagePath = process.env.IMAGE_PATH || './assets/images'
        const pathname = `${imagePath}/${user.username}`
        console.log('\nwriting to pathname', pathname)
        
        const filename = await writeFileToPath(dataurl, pathname)
        console.log('file written', filename)
        
        if (!filename) {
            console.log('\nError: Cannot write file to path.')
            return res.status(400).json({ error: 'Error writing file to path.' })
        }

        const newImage = new UserImage({
            user: user._id.toHexString(),
            filename,
        })

        await newImage.save()
        
        console.log('newImage', newImage)

        const updatedUser = await User.
            findOneAndUpdate({ _id: user._id }, { $set: { profileImage: newImage._id.toHexString(), images: [...user.images, newImage._id.toHexString()] } }, { new: true }).
            // populate('images').
            exec()

        console.log('updatedUser', updatedUser)
        
        return res.status(200).json({ user: updatedUser })
            
        // return User
        //     .findOne({ username })
        //     .then(({ _id, images }) => {
        //         return UserImage
        //             .create({ user: _id, filename })
        //             .then(image => {
        //                 return User
        //                     .findOneAndUpdate({ _id }, { $set: { profileImage: image._id, images: [...images, image._id] } }, { new: true })
        //                     .then(updatedUser => {
        //                         const { _id, email, username, profileImage, images } = updatedUser
        //                         res.status(200).json({ user: { _id, email, username, profileImage, images } })
        //                     })
        //                     .catch(err => {
        //                         console.log('Error updating user profile image', err)
        //                         res.status(400).json({ error: 'Error updating user profile image' })
        //                     })
        //             })
        //             .catch(err => {
        //                 console.log('Error updating user profile image', err)
        //                 return res.status(400).json({ error: 'Error updating user profile image' })
        //             })
        //     })
        //     .catch(err => {
        //         console.log('error doing UserImage stuff', err)
        //         return res.status(400).json({ error: 'Error doing UserImage stuff' })
        //     })    
})
// app.post(
//     '/upload/avatar',
//     async (req, res) => {
//         const { dataurl, username } = req.body
//         const imagePath = process.env.IMAGE_PATH || './assets/images'
//         const pathname = `${imagePath}/${username}`
//         console.log('writing to pathname', pathname)
//         const filename = await writeFileToPath(dataurl, pathname)
//         console.log('file written', filename)
//         if (!filename) {
//             console.log('Error: Cannot write file to path.')
//             return res.status(400).json({ error: 'Error writing file to path.' })
//         } else {
//             return User
//                 .findOne({ username })
//                 .then(({ _id, images }) => {
//                     return UserImage
//                         .create({ user: _id, filename })
//                         .then(image => {
//                             return User
//                                 .findOneAndUpdate({ _id }, { $set: { profileImage: image._id, images: [...images, image._id] } }, { new: true })
//                                 .then(updatedUser => {
//                                     const { _id, email, username, profileImage, images } = updatedUser
//                                     res.status(200).json({ user: { _id, email, username, profileImage, images } })
//                                 })
//                                 .catch(err => {
//                                     console.log('Error updating user profile image', err)
//                                     res.status(400).json({ error: 'Error updating user profile image' })
//                                 })
//                         })
//                         .catch(err => {
//                             console.log('Error updating user profile image', err)
//                             return res.status(400).json({ error: 'Error updating user profile image' })
//                         })
//                 })
//                 .catch(err => {
//                     console.log('error doing UserImage stuff', err)
//                     return res.status(400).json({ error: 'Error doing UserImage stuff' })
//                 })
//         }    
// })

const removeImageFile = filepath => fs.rm(filepath, () => console.log('removed file at path', filepath))
const removeAllImages = username => fs.rmSync(`${IMAGE_PATH}/${username}`, { recursive: true, force: true })

app.post(
    '/images/delete',
    async (req, res) => {
        const { _id } = req.body

        console.log('attempting to remove image with _id:', _id)
        
        const deletedImage = await UserImage.
            findOneAndRemove({ _id }).
            populate('user')

        if (!deletedImage) console.log('no image found to delete')

        console.log('deletedImage', deletedImage)
        
        const filepath = `${imagePath}/${deletedImage.user.username}/${deletedImage.filename}`
        console.log('filepath to remove:', filepath)

        const { images, profileImage } = deletedImage.user
        const updatedImages = images.filter(imageId => imageId !== _id)
        console.log('updatedImages', updatedImages)
        const updatedUser = await User.
            findOneAndUpdate({ _id: deletedImage.user._id },
            {
                $set: {
                    profileImage: profileImage === _id ? null : profileImage,
                    images: updatedImages,
                }
            },
            { new: true })
            .exec()

        removeImageFile(`${imagePath}/${updatedUser.username}/${deletedImage.filename}`)
        return res.status(200).json({ user: updatedUser })
        // UserImage
        //     .findOneAndRemove({ _id })
        //     .populate('user')
        //     .then(image => {
        //         const { user, filename } = image
        //         console.log('deleted image-->', image)
        //         const updatedImages = user.images.filter(img => img._id !== _id)
        //         console.log('updatedImages', updatedImages)
        //         User
        //             .findOneAndUpdate({ _id: user._id }, { $set: { profileImage: user.profileImage === _id ? null : user.profileImage, images: updatedImages } }, { new: true })
        //             .then(updatedUser => {
        //                 removeImageFile(`${imagePath}/${updatedUser.username}/${filename}`)
        //                 res.status(200).json({ user: updatedUser })
        //             })
        //             .catch(err => console.log('err', err))
        //     })
        //     .catch(err => console.log('err', err))



        // User
        //     .findOne({ _id: req.body.user })
        //     .then(user => {
        //         console.log('user images before delete', user.images)
        //         const updatedImages = user.images.filter((image, index) => image._id !== _id)
        //         console.log('user images after delete', updatedImages)
        //         if (user.profileImage === filename) {
        //             console.log(`Image to delete is currently used as avatar. Updating user.profileImage before deleting file: ${filename}`)
        //             User
        //                 .findOneAndUpdate({ _id: req.body.user }, { $set: { profileImage: null, images: updatedImages } }, { new: true })
        //                 .then(user => {
        //                     UserImage
        //                         .findOneAndRemove({ _id })
        //                         .then(result => {
        //                             console.log('image entry removed from db', result.filename)
        //                             removeImageFile(filepath)
        //                             res.status(200).json({ user })
        //                         })
        //                 })
        //                 .catch(err => console.log('err', err))
        //         } else {
        //             User
        //                 .findOneAndUpdate({ _id: req.body.user }, { $set: { images: updatedImages } }, { new: true })
        //                 .then(user => {
        //                     UserImage
        //                         .findOneAndRemove({ _id })
        //                         .then(result => {
        //                             console.log('image entry removed from db', result.filename)
        //                             fs.rm(filepath, () => {
        //                                 console.log('and also removed file at path', filepath)
        //                                 console.log('returning success')
        //                                 res.status(200).json({ success: true })
        //                             })
        //                         })
        //                 })
        //                 .catch(err => console.log('err', err))
        //         }

        //     })
        //     .catch(err => console.log('error', err))
    }
)

app.post('/user/avatar/', (req, res) => {
    const { _id, filename } = req.body
    User
        .findOneAndUpdate({ _id }, { $set: { profileImage: _id } }, { new: true })
        .then(updatedUser => {
            const { _id, email, username, profileImage } = updatedUser
            res.status(200).json({ user: { _id, email, username, profileImage } })
        })
        .catch(err => {
            console.log('Error setting avatar', err)
            res.status(400).json({ error: err })
        })
})

app.get('/user/images/:id', async (req, res) => {
    const _id = req.params.id
    
    const images = await UserImage.
        find({ user: _id })
    
    console.log('images', images)
        
    return res.status(200).json({ images })
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
        .deleteMany({ user: _id })
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
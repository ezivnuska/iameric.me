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
const IMAGE_PATH = process.env.IMAGE_PATH || 'assets'

const Entry = require('./models/Entry')
const Location = require('./models/Location')
const Order = require('./models/Order')
const Product = require('./models/Product')
const UserImage = require('./models/UserImage')
const User = require('./models/User')

const { createServer } = require('http')
const app = express()
const server = createServer(app)
// const { createProxyMiddleware } = require('http-proxy-middleware')

app.use(express.urlencoded({ extended: true }))
app.use(express.json({ limit: '5mb' }))
app.use(cors({
    origin: ['http://localhost:8080','https://iameric.me'],
}))
app.use(express.static('dist'))
app.use('/assets', express.static('./assets'))
// app.use('/api', createProxyMiddleware({ target: 'https://iameric.me:4321', pathRewrite: { '^/api': '' } }));

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}))

// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*')
//     next()
// })

const createToken = user => {
    const { _id, username, email, role, profileImage } = user
    return jwt.sign({
        _id,
        username,
        email,
        role,
        profileImage: profileImage ? profileImage.filename : null,
        exp: Math.floor(Date.now() / 1000) + ((60 * 60) * 24),
    }, SESSION_SECRET, {})
}

const getDecodedUser = token => jwt.decode(token, SESSION_SECRET)

// app.post('/user/get', (req, res) => checkForUser(req, res))

// const checkForUser = async (req, res) => {
//     const { email } = req.body
//     if (!email) res.status(200).json({ msg: 'No email received.', user: null })
//     console.log('> checking for user with email:', email)
//     const userExists = await User
//         .findOne({ email })
//         .then(result => {
//             console.log('User found (result):', result)
//             if (!result) return false
//             return true
//         })
//         .catch(err => {
//             console.log('> error finding user from email.', err)
//             return false
//         })
    
//     if (!userExists) {
//         console.log('> no user found.')
//         return res.json({ msg: 'No user found with that email.', user: false })
//     }
//     console.log('> user exists:', userExists)
//     return res.json({ msg: 'User found.', user: true })
// }

app.post('/signin', (req, res) => handleSignin(req, res))

const handleSignin = async (req, res) => {
    const { email, password } = req.body
    
    const user = await User.
        findOne({ email })
        .populate('profileImage', 'filename')

    if (!user)
        return res.status(406).json({ invalid: 'email', msg: 'No user found with that email.' })
    
    const passwordsMatch = await bcrypt.compare(password, user.password)

    if (!passwordsMatch)
        return res.status(406).json({ invalid: 'password', msg: 'Could not verify user.' })

    user.token = createToken(user)

    await user.save()

    const sanitizedUser = getSanitizedUser(user)

    console.log(`\nUser signed in: ${user.username}`)
    
    return res.status(200).json(sanitizedUser)
}

app.post('/signup', (req, res) => handleSignup(req, res))

const createUser = async ({ email, username }) => {
    
    let user = await User.findOne({ email })
    
    if (user) {
        console.log('A user with that email already exists.')
        return res.status(200).json({ success: false })
    }

    user = await User.create({ username, email })

    if (!user) throw new Error(`Error creating user: ${username}, ${email}`)
    
    await user.save()

    console.log('New user created', user.username)
    
    const newToken = createToken(user)
    
    user = await User.
        findOneAndUpdate({ _id: newUser._id.toString() }, { $set: { token: newToken } }, { new: true }).
        populate('profileImage', 'filename')

    if (!user) {
        console.log('Error updating user with token')
        return
    }

    console.log(`User created: ${user.username}`)

    return user
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

const getSanitizedUser = ({
    _id,
    email,
    images,
    location,
    profileImage,
    role,
    username,
    token,
}) => ({
    _id,
    email,
    images,
    location,
    profileImage,
    role,
    username,
    token,
})

app.post('/authenticate', async (req, res) => {
    
    const { token } = req.body
    
    console.log('authenticating saved token...')
    
    const userFromToken = getDecodedUser(token)
    
    console.log(`\n${userFromToken.username} was previously connected.\n`)
    
    const expired = (new Date(userFromToken.exp) - Date.now() > 0)
    if (expired) {
        console.log('token expired')
        return res.status(406).json({ userFromToken, error: 'token expired' })
    }

    const user = await User
        .findOne({ _id: userFromToken._id })
        // .populate('profileImage', 'filename')
        // .populate('location')
        // .populate('images', 'filename')

    if (!user) {
        console.log('failed to refresh user token')
        return res.status(200).json(null)
    }

    user.token = createToken(user)

    await user.save()

    if (!user) {
        console.log('Error saving user with updated token')
        return res.status(200).json(null)
    }

    return res.status(200).json({ user: getSanitizedUser(user) })
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

const handleSignout = async (req, res) => {
    console.log('\nsigning out')
    const user = await User.
        findOneAndUpdate({ _id: req.body._id }, { $set: { token: null, } }, { new: true })

    if (!user) return res.status(200).json(null)

    console.log(`\nUser signed out: ${user.username}`)

    return res.status(200).json({ user })
}

app.post('/signout', (req, res) => handleSignout(req, res))

app.get('/users', async (req, res) => {
    const users = await User.
        find({})
    
    if (!users) {
        console.log('Could not fetch users')
        return res.json(null)
    }

    return res.status(200).json({ users })
})

app.get('/vendors', async (req, res) => {
    const allVendors = await User
        .find({ role: 'vendor' })
        .populate('profileImage', 'filename')
    
    if (!allVendors) return res.json(null)

    const vendors = allVendors.map(({ _id, profileImage, username, }) => ({
        _id,
        profileImage: profileImage || null,
        username,
    }))

    return res.json({ vendors })
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

// location

app.post('/location', async (req, res) => {
    const { body } = req
    const { userId, username, address1, address2, city, state, zip } = body
    const newLocation = { userId, username, address1, address2, city, state, zip }
    let location = await Location.findOneAndUpdate({ userId }, { $set: newLocation }, { new: true })
    if (!location) location = await Location.create(newLocation)
    const user = await User.findOne({ _id: userId })
    if (!user.location) {
        user.location = location._id
        await user.save()
    }
    return res.status(200).json({ location })
    
})

app.get('/user/location/:userId', async (req, res) => {
    const { userId } = req.params
    const response = await Location
        .findOne({ userId })

    if (!response) {
        console.log('Error getting user location')
        return res.json({ location: null })
    }

    return res.json({ location: response })
})

// [menu] product

app.post('/product', async (req, res) => {
    const { body } = req
    const { _id, price, title, desc, vendor, blurb, category } = body
    const newItem = { price, title, desc, vendor, blurb, category }

    let item = null

    if (_id) {
        console.log('updating existing product')
        item = await Product.
        findOneAndUpdate({ _id }, { $set: { price, vendor, title, desc, blurb, category } }, { new: true } )
    } else {
        console.log('adding new product')
        item = await Product.create(newItem)
    }

    if (!item) {
        console.log(`Error ${_id ? 'updating' : 'adding'} item`)
        return res.status(406).json({ item: null })
    }

    return res.status(200).json(item)
})

app.get('/products/:vendor', async (req, res) => {
    const { vendor } = req.params
    const items = await Product.
        find({ vendor }).
        populate('vendor')
    
    if (!items) {
        console.log('Error getting products')
        return res.status(400).json(null)
    }

    return res.status(200).json({ items })
})

app.delete('/products/delete', async (req, res) => {
    const item = await Product
        .findByIdAndDelete(req.body.id)
    return res.status(200).json({ item })
})

app.get('/users/:id', async (req, res, next) => {
    const _id = req.params.id
    const user = await User.
        findOne({ _id }).
        populate('location').
        populate('profileImage', 'filename')
        
    if (!user) return res.status(406).json({ user: null })
        
    return res.status(200).json({ user })
})

app.get('/users/self/:id', async (req, res, next) => {
    const _id = req.params.id
    User
        .findOne({ _id })
        .then(({ profileImage }) => res.json({ profileImage }))
})

const handleFileUpload = async (file, path, filename) => {
    // console.log('file', file)
    const regex = /^data:.+\/(.+);base64,(.*)$/
    const matches = file.match(regex)
    // console.log('matches', matches)
    const ext = matches[1]
    const data = matches[2]
    const buffer = Buffer.from(data, 'base64')

    let dirExists = fs.existsSync(path)
    if (!dirExists) mkdirp.sync(path)
    dirExists = fs.existsSync(path)
    if (!dirExists) mkdirp.sync(filepath)
    // const nameOfFile = `${filename}.${ext}`
    const fileToWrite = `${path}/${filename}`
    console.log('file to write:', fileToWrite)
    try {
        fs.writeFile(fileToWrite, buffer, err => {
            if (err) return console.log('Error writing file:', err)
            console.log('file written:', fileToWrite)
        })
    } catch {
        console.log('CATCH: Error writing file.')
        return null
    }
    return filename
}

app.post(
    '/image/upload',
    async (req, res) => {
        const { _id, dataURI, timestamp, type } = req.body
        const user = await User.findOne({ _id })
        const assetPath = `${IMAGE_PATH}/${user.username}`
        const thumbPath = type ? `${assetPath}/${type}` : null
        const filename = `${user._id}${timestamp}.png`
        
        const uploadedFile = await handleFileUpload(dataURI, thumbPath || assetPath, filename)
        if (!uploadedFile) return res.status(400).json({ error: `Error writing ${type || 'image'}` })

        let image = await UserImage.findOne({ user: user._id, filename })
        if (image) {
            const images = [...user.images, image._id]
            const userUpdated = await User
                .findOneAndUpdate(
                    { _id: user._id },
                    { $set: { images } },
                    { new: true },
                )
            
            if (!userUpdated) return res.status(200).json({ error: `Error updating user images.` })    
        } else {
            image = new UserImage({ user: user._id, filename })
            await image.save()
        }

        return res.status(200).json({ id: image._id })
    }
)

app.post(
    '/upload/avatar',
    async (req, res) => {
        const { _id, avatar, timestamp } = req.body
        const user = await User.findOne({ _id })

        const path = `${IMAGE_PATH}/${user.username}`

        console.log('\nwriting avatar to path', path)
        const avatarname = await handleFileUpload(avatar, path, timestamp)
        console.log(`avatar written: ${path}/${avatarname}`)
        console.log('avatarname', avatarname)

        if (!avatarname) {
            console.log('\nError: Cannot write avatar to path.')
            return res.status(400).json({ error: 'Error writing avatar to path.' })
        }

        const newImage = new UserImage({
            user: user._id,
            filename: avatarname,
        })


        await newImage.save()
        
        console.log('newImage', newImage)

        const updatedUser = await User.
            findOneAndUpdate({ _id: user._id }, { $set: {
                profileImage: user.profileImage ? user.profileImage : newImage._id,
                images: [
                    ...user.images,
                    newImage._id
                ],
            } }, { new: true })
            .populate('profileImage', 'filename')
            .populate({
                path: 'images',
                select: 'filename',
                // populate: { path: 'images' },
            })

        if (!updatedUser) {
            console.log('Could not update user images/profileImage')
            return res.status(200).json(null)
        }
        console.log('updatedUser', updatedUser)

        const { images, profileImage } = updatedUser
        
        return res.status(200).json({ images, profileImage, imageId: newImage._id })
})

app.post(
    '/upload/thumb',
    async (req, res) => {
        const { _id, thumb, timestamp } = req.body
        const user = await User.findOne({ _id })
        
        const path = `${IMAGE_PATH}/${user.username}`

        console.log('\nwriting thumb to path', path)
        const thumbname = await handleFileUpload(thumb, path, timestamp, 'thumb')
        console.log(`thumb written: ${path}/${thumbname}`)

        if (!thumbname) {
            console.log('\nError: Cannot write thumb to path.')
            return res.status(400).json({ error: 'Error writing thumb to path.' })
        }
        
        return res.status(200).json({ thumb: thumbname })
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

const removeImage = async path => fs.rm(path, () => console.log('removed file at path', path))
const removeAllImages = username => fs.rmSync(`${IMAGE_PATH}/${username}`, { recursive: true, force: true })

app.post(
    '/images/delete',
    async (req, res) => {
        const { _id } = req.body
        
        const deletedImage = await UserImage.
            findOneAndRemove({ _id })
            .populate({
                path: 'user',
                select: 'username images',
                populate: { path: 'images' },
            })

        if (!deletedImage) console.log('Could not find image to delete')

        const userPath = `${IMAGE_PATH}/${deletedImage.user.username}`
        const filenameToDelete = deletedImage.filename

        const pathToThumb = `${userPath}/thumb/${filenameToDelete}`
        const pathToAvatar = `${userPath}/${filenameToDelete}`

        const { images, profileImage } = deletedImage.user

        const updatedImages = images.filter(imageId => imageId !== _id)
        
        const updatedUser = await User.
            findOneAndUpdate({ _id: deletedImage.user._id },
            {
                $set: {
                    profileImage: profileImage !== _id ? profileImage : null,
                    images: updatedImages,
                }
            },
            { new: true })
        
        if (!updatedUser) return res.status(200).json({
            error: 'Could not update user after image deletion.'
        })

        await removeImage(pathToAvatar)
        await removeImage(pathToThumb)

        return res.status(200).json({ id: deletedImage._id })
    }
)

app.post('/user/avatar', async (req, res) => {
    const { userId, imageId } = req.body
    
    const user = await User.
        findOneAndUpdate({ _id: userId }, { $set: { profileImage: imageId } }, { new: true }).
        populate('profileImage', 'filename')

    if (!user) return console.log('Error: could not find user while updating avatar')
    
    return res.status(200).json(user.profileImage)
})

app.get('/images/:id', async (req, res) => {
    
    const image = await UserImage.findOne({ _id: req.params.id })
    if (!image) return res.status(200).json({ error: 'Error fetching image data.' })
    const { _id, filename, user } = image
    return res.status(200).json({ _id, filename, user })
})

app.get('/avatar/:id', async (req, res) => {
    const _id = req.params.id
    
    const user = await User.
        findOne({ _id }).
        populate('profileImage', 'filename')

    return res.status(200).json(user)
})

app.get('/user/images/:id', async (req, res) => {
    const _id = req.params.id
    
    const images = await UserImage
        .find({ user: _id })
        .populate('user', 'username images')

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

const getSanitizedOrders = orders => orders.map(({
    _id, customer, date, driver, items, status, vendor, confirmed, accepted, pickup, arrived, received, delivered, closed, ready,
}) => ({
    _id, customer, date, driver, items, status, vendor, confirmed, accepted, pickup, arrived, received, delivered, closed, ready,
}))

app.get('/orders/:id', async (req, res) => {
    const { id } = req.params
    let orders = await Order.
        find({ $or: [{ customer: id }, { driver: id }, { vendor: id }] }).
        populate('items', 'price title').
        populate({
            path: 'customer',
            select: 'username location',
            populate: { path: 'location' }
        }).
        populate({
            path: 'vendor',
            select: 'username location',
            populate: { path: 'location' }
        }).
        populate('driver', 'username')

    if (!orders) {
        console.log('Error getting orders by id')
        return res.json(400).json(null)
    }

    orders = getSanitizedOrders(orders)

    return res.status(200).json(orders)
})

app.get('/orders', async (req, res) => {
    let orders = await Order.
        find({}).
        populate('items', 'price title').
        populate({
            path: 'customer',
            select: 'username location',
            populate: { path: 'location' }
        }).
        populate({
            path: 'vendor',
            select: 'username location',
            populate: { path: 'location' }
        }).
        populate('driver', 'username')
    
    if (!orders) {
        console.log('Error getting orders')
        return res.json(400).json(null)
    }

    orders = getSanitizedOrders(orders)

    return res.status(200).json(orders)
})

app.get('/orders/customer/:id', async (req, res) => {
    const { id } = req.params
    
    let orders = await Order.
        find({ customer: id }).
        populate('items', 'price title').
        populate({
            path: 'customer',
            select: 'username location',
            populate: { path: 'location' }
        }).
        populate({
            path: 'vendor',
            select: 'username location',
            populate: { path: 'location' }
        }).
        populate('driver', 'username')

    if (!orders) {
        console.log('Error getting customer orders by id')
        return res.json(400).json(null)
    }

    orders = getSanitizedOrders(orders)

    return res.status(200).json({ orders })
})

app.get('/orders/driver/:id', async (req, res) => {
    const { id } = req.params
    
    let orders = await Order.
        find({
            $or: [
                { driver: id },
                { status: { $eq: 1 } },
            ],
        }).
        populate('items', 'price title').
        populate({
            path: 'customer',
            select: 'username location',
            populate: { path: 'location' }
        }).
        populate({
            path: 'vendor',
            select: 'username location',
            populate: { path: 'location' }
        }).
        populate('driver', 'username')

    if (!orders) {
        console.log('Error getting driver orders by id')
        return res.json(400).json(null)
    }

    orders = getSanitizedOrders(orders)

    return res.status(200).json({ orders })
})

app.get('/orders/vendor/:id', async (req, res) => {
    const { id } = req.params
    
    let orders = await Order.
        find({ vendor: id }).
        populate('items', 'price title').
        populate('driver', 'username').
        populate({
            path: 'customer',
            select: 'username location',
            populate: { path: 'location' }
        }).
        populate({
            path: 'vendor',
            select: 'username location',
            populate: { path: 'location' }
        })

    if (!orders) {
        console.log('Error getting vendor orders by id')
        return res.json(400).json(null)
    }

    orders = getSanitizedOrders(orders)

    return res.status(200).json({ orders })
})

app.post('/order', async (req, res) => {
    const { customer, items, vendor } = req.body

    let order = await Order.create({
        customer,
        items,
        vendor,
    })
        
    order = await Order.findOne({ _id: order._id }).
        populate('items', 'title price').
        populate({
            path: 'customer',
            select: 'username location',
            populate: { path: 'location' }
        }).
        populate({
            path: 'vendor',
            select: 'username location',
            populate: { path: 'location' }
        })

    if (!order) {
        console.log('Error creating new order')
        return res.json(400).json(null)
    }
    
    console.log(`new order created by ${order.customer.username} from ${order.vendor.username}`)

    return res.status(200).json(order)
    
})

app.post('/order/confirm', async (req, res) => {
    const { id, pickup } = req.body
    
    const order = await Order.
        findOneAndUpdate({ _id: id }, { $set: {
            status: 1,
            confirmed: Date.now(),
            pickup,
        } }, { new: true }).
        populate({
            path: 'customer',
            select: 'username location',
            populate: { path: 'location' }
        }).
        populate({
            path: 'vendor',
            select: 'username location',
            populate: { path: 'location' }
        }).
        populate('driver', 'username')

    if (!order) {
        console.log('Could not confirm order')
        return res.status(400).json(null)
    }

    console.log(`${order.vendor.username} confirmed order for ${order.customer.username}`)

    return res.status(200).json(order)
})

app.post('/order/accept', async (req, res) => {
    const { id, driver } = req.body
    const order = await Order.
        findOneAndUpdate({ _id: id }, { $set: {
            status: 2,
            driver,
            accepted: Date.now(),
        } }, { new: true }).
        populate({
            path: 'customer',
            select: 'username location',
            populate: { path: 'location' }
        }).
        populate({
            path: 'vendor',
            select: 'username location',
            populate: { path: 'location' }
        }).
        populate('driver', 'username')
        
    if (!order) console.log('Could not accept order')

    console.log(`${order.driver.username} accepted order for ${order.customer.username} from ${order.vendor.username}`)

    return res.status(200).json(order)
})

app.post('/order/ready', async (req, res) => {
    const { id } = req.body
    const order = await Order.
        findOneAndUpdate({ _id: id }, { $set: {
            ready: Date.now(),
        } }, { new: true }).
        populate({
            path: 'customer',
            select: 'username location',
            populate: { path: 'location' }
        }).
        populate({
            path: 'vendor',
            select: 'username location',
            populate: { path: 'location' }
        }).
        populate('driver', 'username')
        
    if (!order) console.log('Could not mark order ready')

    console.log(`${order.vendor.username} marked order for ${order.customer.username} as ready`)

    return res.status(200).json(order)
})

app.post('/order/arrived', async (req, res) => {
    const { id } = req.body
    
    const order = await Order.
        findOneAndUpdate({ _id: id }, { $set: {
            status: 3,
            arrived: Date.now(),
        } }, { new: true }).
        populate({
            path: 'customer',
            select: 'username location',
            populate: { path: 'location' }
        }).
        populate({
            path: 'vendor',
            select: 'username location',
            populate: { path: 'location' }
        }).
        populate('driver', 'username')

    if (!order) {
        console.log('Could not update driver status')
        return res.status(400).json(null)
    }

    console.log(`${order.driver.username} arrived at ${order.vendor.username}`)

    return res.status(200).json(order)
})

app.post('/order/received', async (req, res) => {
    const { id } = req.body
    const order = await Order.
        findOneAndUpdate({ _id: id }, { $set: {
            status: 4,
            received: Date.now(),
        } }, { new: true }).
        populate({
            path: 'customer',
            select: 'username location',
            populate: { path: 'location' }
        }).
        populate({
            path: 'vendor',
            select: 'username location',
            populate: { path: 'location' }
        }).
        populate('driver', 'username')
        
    if (!order) console.log('Could not save order status as picked up')
    
    console.log(`${order.driver.username} picked up order for ${order.customer.username} from ${order.vendor.username}`)

    return res.status(200).json(order)
})

app.post('/order/complete', async (req, res) => {
    const { id } = req.body
    const order = await Order.
        findOneAndUpdate({ _id: id }, { $set: {
            status: 5,
            delivered: Date.now(),
        } }, { new: true }).
        populate({
            path: 'customer',
            select: 'username location',
            populate: { path: 'location' }
        }).
        populate({
            path: 'vendor',
            select: 'username location',
            populate: { path: 'location' }
        }).
        populate('driver', 'username')
        
    if (!order) {
        console.log('Could not complete order')
        return res.status(406).json({ err: 'Error completing order'})
    }
    console.log(`${order.driver.username} completed order from ${order.vendor.username} to ${order.customer.username}`)

    return res.status(200).json(order)
})

app.post('/order/close', async (req, res) => {
    const { id } = req.body
    const order = await Order.
        findOneAndUpdate({ _id: id }, { $set: {
            status: 6,
            closed: Date.now(),
        } }, { new: true }).
        populate({
            path: 'customer',
            select: 'username location',
            populate: { path: 'location' }
        }).
        populate({
            path: 'vendor',
            select: 'username location',
            populate: { path: 'location' }
        }).
        populate('driver', 'username')
        
    if (!order) {
        console.log('Could not close order')
        return res.status(406).json({ err: 'Error closing order'})
    }
    console.log(`Closed order (${order._id}) from ${order.vendor.username}`)

    return res.status(200).json(order)
})

app.delete('/order/:id', async (req, res) => {
    const { id } = req.params
    const order = await Order.findByIdAndDelete(id)
    return res.status(200).json({ order })
})

mongoose.Promise = global.Promise
mongoose.set('strictQuery', false)
mongoose
    .connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        keepAlive: true,
    })
    .then(() => console.log(`MongoDB connected to\n${db}\n\nHello World\n\n\n\n\n\n\n`))
    .catch(err => console.log('Error connecting to database', err))

server.listen(PORT, () => console.log(`\n\n\nserver listen on ${PORT}\n`))
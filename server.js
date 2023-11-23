const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const session = require('express-session')

require('dotenv').config()

const SESSION_SECRET = process.env.JWT_SECRET || require('./config').JWT_SECRET
const db = process.env.DB_CONNECTION_STRING || require('./config').DB_CONNECTION_STRING
const PORT = process.env.PORT || require('./config').PORT

const {
    authenticate,
    closeAccount,
    handleSignin,
    handleSignout,
    handleSignup,
} = require('./api/auth')

const {
    getAllUsers,
    // getAllVendorIds,
    getAllVendors,
    getUserById,
} = require('./api/users')

const {
    deleteImageById,
    deletePreview,
    getImagesByUserId,
    getImageWithUsernameByImageId,
    getImageIdFromFilename,
    getProfileImageByUserId,
    updateProfileImage,
    uploadAvatar,
    uploadImage,
    uploadProductImage,
} = require('./api/images')

const {
    createOrUpdateProduct,
    deleteProductById,
    getProductById,
    getProductIdsByVendorId,
    getProductsByVendorId,
    addImageIdToProduct,
} = require('./api/products')

const {
    createOrUpdateLocation,
    getLocationByUserId,
} = require('./api/location')

const {
    acceptOrder,
    closeOrder,
    confirmOrder,
    createOrder,
    deleteOrderByOrderId,
    getAllOrders,
    // getOrderIdsByUserId,
    getOrdersByCustomerId,
    getOrdersByDriverId,
    getOrdersByUserId,
    getOrdersByVendorId,
    markDriverAtVendorLocation,
    markOrderAsReady,
    markOrderComplete,
    markOrderReceivedByDriver,
} = require('./api/orders')
    
// not currently using entries
const {
    createEntry,
    deleteEntryById,
    getEntries,
} = require('./api/entries')

const { createServer } = require('http')
const app = express()
const server = createServer(app)

app.use(express.urlencoded({ extended: true }))
app.use(express.json({ limit: '5mb' }))
app.use(cors({
    origin: ['https://localhost:8080', 'https://iameric.me'],
}))
app.use(express.static('dist'))
app.use('/assets', express.static('./assets'))

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}))

// auth
app.post(   '/signin',                 handleSignin)
app.post(   '/signup',                 handleSignup)
app.post(   '/authenticate',           authenticate)
app.post(   '/signout',                handleSignout)
app.post(   '/unsubscribe',            closeAccount)

// users
app.get(    '/users',                   getAllUsers)
app.get(    '/vendors',                 getAllVendors)
app.get(    '/users/:id',               getUserById)

// entries
app.post(   '/entry',                   createEntry)
app.get(    '/entries',                 getEntries)
app.delete( '/entry/delete/:id',        deleteEntryById)

// location
app.post(   '/location',                createOrUpdateLocation)
app.get(    '/location/:userId',        getLocationByUserId)

// products
app.post(   '/product',                 createOrUpdateProduct)
app.delete( '/products/delete/:id',     deleteProductById)
app.get(    '/products/:vendor',        getProductsByVendorId)
app.post(   '/product/image',           addImageIdToProduct)
app.get(    '/product/:id',             getProductById)

// images
app.post(   '/user/avatar',             updateProfileImage)
app.get(    '/image/:id',               getImageWithUsernameByImageId)
app.get(    '/avatar/:id',              getProfileImageByUserId)
app.get(    '/user/images/:id',         getImagesByUserId)
app.post(   '/upload/avatar',           uploadAvatar)
app.post(   '/images/delete',           deleteImageById)
app.post(   '/image/upload',            uploadImage)
app.post(   '/product/image/upload',    uploadProductImage)
app.post(   '/preview/delete',          deletePreview)
app.get(    '/images/:name',            getImageIdFromFilename)

// orders
app.get(    '/orders/:id',              getOrdersByUserId)
app.get(    '/orders',                  getAllOrders)
app.get(    '/orders/user/:id',         getOrdersByUserId)
app.get(    '/orders/customer/:id',     getOrdersByCustomerId)
app.get(    '/orders/driver/:id',       getOrdersByDriverId)
app.get(    '/orders/vendor/:id',       getOrdersByVendorId)
app.post(   '/order',                   createOrder)
app.post(   '/order/confirm',           confirmOrder)
app.post(   '/order/accept',            acceptOrder)
app.post(   '/order/ready',             markOrderAsReady)
app.post(   '/order/arrived',           markDriverAtVendorLocation)
app.post(   '/order/received',          markOrderReceivedByDriver)
app.post(   '/order/complete',          markOrderComplete)
app.post(   '/order/close',             closeOrder)
app.delete( '/order/:id',               deleteOrderByOrderId)

mongoose.Promise = global.Promise
mongoose.set('strictQuery', false)
mongoose
    .connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        keepAlive: true,
    })
    .then(() => console.log(`> MongoDB connected.\n\n* * * * * * * * * * * * * *\n\n*\tiameric.me\t  *\n\n* * * * * * * * * * * * * *\n\n`))
    .catch(err => console.log('Error connecting to database', err))

server.listen(PORT, () => console.log(`\n\n\n> server listening on ${PORT}`))
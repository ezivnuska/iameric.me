// Import dependencies
const express = require('express')
const { createServer } = require('http')
const { Server } = require('socket.io')
const mongoose = require('mongoose')
const session = require('express-session')
const cors = require('cors')
require('dotenv').config()

console.log(`<< ${process.env.NODE_ENV} >>`)

const SESSION_SECRET = process.env.JWT_SECRET || require('./config').JWT_SECRET
const db = process.env.DB_CONNECTION_STRING || require('./config').DB_CONNECTION_STRING
// const PORT = 4321
const PORT = process.env.NODE_ENV === 'production' ? process.env.PORT || require('./config').production.port : require('./config').development.port
console.log('PORT', PORT)
console.log('process.env.NODE_ENV', process.env.NODE_ENV)
// Create Express app
const app = express();
const server = createServer(app);

const sessionMiddleware = session({
  secret: SESSION_SECRET,
  resave: true,
  saveUninitialized: true
})

// CORS options
const corsOptions = {
  origin: [
    'wss://iameric.me',
    'http://localhost:3000',
    'http://localhost:4321',
    'https://iameric.me',
  ],
  credentials: true, // enable set cookie
  methods: ['GET', 'POST'], // Allow only GET and POST requests
  // allowedHeaders: ['Content-Type'], // Allow only specific headers
}

// Enable CORS
app.use(cors(corsOptions))

// Set up express-session
app.use(sessionMiddleware)

const io = new Server(server, {
  cors: corsOptions,
})

io.engine.use(sessionMiddleware)

// Set up Mongoose connection
mongoose.connect(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log(`MongoDB connected`))
  .catch(err => console.log(err));

app.use(express.urlencoded({ extended: true }))
app.use(express.json({ limit: '5mb' }))
app.use(express.static('dist'))
app.use('/assets', express.static('./assets'))

// Set up Socket.IO
io.on('connection', (socket) => {

  console.log('>>> connection', socket.id)
  // console.log('socket.request', socket.request)
  // const sessionId = socket.request.session.id
    // console.log(`\n<< connection >>`, sessionId)

    // socket.join(sessionId)

    // console.log(`emitting << connection >> (why?)\n`)
    io.emit('connection', socket.id)

    const SESSION_RELOAD_INTERVAL = 30 * 1000

    // const timer = setInterval(() => {
    //     socket.request.session.reload((err) => {
    //     if (err) {
    //         // forces the client to reconnect
    //         socket.conn.close()
    //         // you can also use socket.disconnect(), but in that case the client
    //         // will not try to reconnect
    //     }
    //     })
    // }, SESSION_RELOAD_INTERVAL)

    socket.on('user_signed_in', (profile) => {
        console.log('<< user_signed_in >>')
        // console.log(`\n--> (${profile.username}). emitting << add_socket >>\n`)
        // socket.emit('add_socket', profile)
        // socket.broadcast.emit('add_socket', username)
    })

    // socket.on('i_hear_ya', profile => {
    //     console.log('<< i_hear_ya >>')
    //     socket.emit('add_socket', profile)
    //     // socket.broadcast.emit('add_socket', username)
    // })

    socket.on('new_order', order => {
        console.log(`\n<< new_order >>\n`)
        // socket.emit('add_order', order)
        socket.broadcast.emit('add_order', order)
    })

    socket.on('order_updated', order => {
        console.log(`\n<< order_updated >>\n`)
        // socket.emit('add_order', order)
        socket.broadcast.emit('update_order', order)
    })

    socket.on('order_removed', id => {
        console.log(`\n<< order_removed >>\n`)
        // socket.emit('add_order', order)
        socket.broadcast.emit('remove_order', id)
    })

    socket.on('connected', (username, callback) => {
        console.log(`\n<< connected >>`)
        console.log(`${username} signed in. broadcasting << connected >> to all users\n`)
        // io.emit('connection', username)
        if (username) {
            console.log(`--> (${username}). emitting << add_socket >> to all users`)
            io.emit('add_socket', username)
            // socket.broadcast.emit('add_socket', username)
        }
    })

    socket.on('disconnect', async reason => {
        console.log('disconnect', reason)
        // const sockets = await io.in(userId).fetchSockets();
        // if (sockets.length === 0) {
        // // no more active connections for the given user
        // }
        // clearInterval(timer)
    })
});

// const SOCKET_PORT = process.env.NODE_ENV === 'production' ? process.env.SOCKET_PORT || config.production.SOCKET_PORT : config.development.SOCKET_PORT
// console.log('SOCKET_PORT', SOCKET_PORT)
// io.listen(4321)

const {
  authenticate,
  deleteAccount,
  handleSignin,
  handleSignout,
  handleSignup,
  validateToken,
} = require('./api/auth')

const {
  getUser,
  getProfileImage,
} = require('./api/user')

const {
  getUsers,
  getUserDetailsById,
  getNumberOfOnlineUsers,
  getAllVendors,
  getUserById,
  getUserAndImagesById,
  getVendor,
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
  getProductsByVendorId,
  addImageIdToProduct,
} = require('./api/products')

const {
  createOrUpdateLocation,
  getLocationByUserId,
  getUserLocationWithLocationId,
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
  getRelevantOrdersByUserId,
  markDriverAtVendorLocation,
  markOrderAsReady,
  markOrderCompleted,
  markOrderReceivedByDriver,
} = require('./api/orders')
  
// not currently using entries
const {
  createEntry,
  deleteEntryById,
  getEntries,
} = require('./api/entries')

// auth
app.post(   '/signin',                 handleSignin)
app.post(   '/signup',                 handleSignup)
app.post(   '/authenticate',           authenticate)
app.get(    '/signout/:id',            handleSignout)
app.post(   '/unsubscribe',            deleteAccount)
app.get(    '/token/:token',           validateToken)

// user
app.get(    '/profile/:id',             getUser)
app.get(    '/profile/image/:id',       getProfileImage)

// users
app.get(    '/user/:id',                getUserById)
app.get(    '/user/full/:id',           getUserAndImagesById)
app.get(    '/user/details/:id',        getUserDetailsById)
app.get(    '/users',                   getUsers)
app.get(    '/users/online',            getNumberOfOnlineUsers)
app.get(    '/vendor/:id',              getVendor)
app.get(    '/vendors',                 getAllVendors)

// entries
app.post(   '/entry',                   createEntry)
app.get(    '/entries',                 getEntries)
app.delete( '/entry/delete/:id',        deleteEntryById)

// location
app.post(   '/location',                createOrUpdateLocation)
app.get(    '/location/:userId',        getLocationByUserId)
app.get(    '/user/location/:locationId', getUserLocationWithLocationId)

// products
app.post(   '/product',                 createOrUpdateProduct)
app.delete( '/products/delete/:id',     deleteProductById)
app.get(    '/products/:vendor',        getProductsByVendorId)
app.post(   '/product/image',           addImageIdToProduct)
app.get(    '/product/:id',             getProductById)

// images
app.post(   '/user/avatar',             updateProfileImage)
app.post(   '/image/upload',            uploadImage)
app.get(    '/image/:id',               getImageWithUsernameByImageId)
app.get(    '/avatar/:id',              getProfileImageByUserId)
app.get(    '/user/images/:id',         getImagesByUserId)
app.post(   '/upload/avatar',           uploadAvatar)
app.post(   '/images/delete',           deleteImageById)
app.post(   '/product/image/upload',    uploadProductImage)
app.post(   '/preview/delete',          deletePreview)
app.get(    '/images/:name',            getImageIdFromFilename)

// orders
app.get(    '/orders/all',              getAllOrders)
app.get(    '/orders/:id',              getRelevantOrdersByUserId)
app.get(    '/orders/admin/:id',        getAllOrders)
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
app.post(   '/order/complete',          markOrderCompleted)
app.post(   '/order/close',             closeOrder)
app.delete( '/order/:id',               deleteOrderByOrderId)

// 404 Handler
app.use(function (req, res, next) {
  const status = 404
  const message = 'Resource not found'
  const errorResponse = {
    data: [],
    isError: true,
    errMsg: message,
  }
  res.status(status).send(errorResponse)
})

// Server Error 500 Handler
// Calling next(error) in any of the routes will call this function
app.use(
(
  error,
  req,
  res,
  next,
) => {
  // Incase of 500 Server Error
  // The Error is only logged in server and not sent in response to restrict error details being known in the frontend
  console.error(error)
  const status = 500
  const message =
  process.env.NODE_ENV === 'development'
      ? error.message
      : 'API Server Error'

  const errorResponse = {
      data: [],
      isError: true,
      errMsg: message,
  }

  res.status(status).send(errorResponse)
})

// Start server
// const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

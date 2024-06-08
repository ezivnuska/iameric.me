const express = require('express')
const { createServer } = require('http')
const { Server } = require('socket.io')
const mongoose = require('mongoose')
const session = require('express-session')
const cors = require('cors')
const routes = require('./routes')
require('dotenv').config()

const SESSION_SECRET = process.env.JWT_SECRET || require('./config').JWT_SECRET
const db = process.env.DB_CONNECTION_STRING || require('./config').DB_CONNECTION_STRING
const PORT = process.env.PORT || require('./config').development.port

const app = express()
const server = createServer(app)

const sessionMiddleware = session({
  secret: SESSION_SECRET,
  resave: false,// set to true to reset session on every request
  saveUninitialized: true,
})

const corsOptions = {
  origin: [
    // 'wss://iameric.me',
    'http://localhost:3000',
    'http://localhost:4000',
    'https://iameric.me',
  ],
  credentials: true,
  // methods: ['GET', 'POST'],
}

// Enable CORS
app.use(cors(corsOptions))

// Set up express-session
app.use(sessionMiddleware)

app.use(express.urlencoded({ extended: true }))
app.use(express.json({ limit: '5mb' }))
app.use(express.static('dist'))
app.use('/assets', express.static('./assets'))

app.use('/api', routes)

// Set up Mongoose connection
mongoose.connect(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log(`MongoDB connected`))
  .catch(err => console.log(err));

const io = new Server(server, {
  cors: corsOptions,
})

io.engine.use(sessionMiddleware)

// Set up Socket.IO
io.on('connection', (socket) => {

  console.log(`\n<< connection >> ${socket.id}`)

    // socket.join(sessionId)
    io.emit('new_connection', socket.id)

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
    
    socket.on('new_socket_connected', (socketId, callback) => {
      console.log(`<< new_socket_connected >>\n${socketId} connected.\nemitting << add_socket >>\n`)
      io.emit('add_socket', socketId)
      // io.emit('connection', username)
      // if (username) {
        //     console.log(`--> (${username}). emitting << add_socket >> to all users`)
        //     // socket.broadcast.emit('add_socket', username)
        // }
    })

    socket.on('list_connected_sockets', () => {
      const connectedSockets = Object.keys(io.sockets.sockets)
      console.log(`\n${connectedSockets.toString()}\n`)
      socket.emit('connected_sockets_list', connectedSockets)
    })
    
    socket.on('user_signed_in', (userId, callback) => {
        console.log(`\n<< user_signed_in >>\nuser with id ${userId} signed in.\nbroadcasting << signed_in_user >>\n`)
        socket.broadcast.emit('signed_in_user', userId)
        if (callback) callback(userId)
        // callback({
        //   userId,
        //   status: 'signed_in',
        // })
        // if (username) {
        //     console.log(`--> (${username}). emitting << add_socket >> to all users`)
            // socket.broadcast.emit('add_socket', username)
        // }
    })

    socket.on('user_signed_out', (userId, callback) => {
        console.log(`\n<< user_signed_out >>\nuser with id ${userId} signed out.\nbroadcasting << signed_out_user >>\n`)
        socket.broadcast.emit('signed_out_user', userId)
        if (callback) callback(userId)
    })

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

    socket.on('disconnect', async reason => {
        console.log('disconnect', reason)
        // const sockets = await io.in(userId).fetchSockets()
        // if (sockets.length === 0) {
        // // no more active connections for the given user
        // }
        // clearInterval(timer)
    })
})

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
  // 500 Server Error
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

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

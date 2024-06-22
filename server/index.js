const express = require('express')
const { createServer } = require('http')
const { Server } = require('socket.io')
const mongoose = require('mongoose')
const session = require('express-session')
const cors = require('cors')
const path = require('path')
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
	methods: ['GET', 'POST'],
}

// Enable CORS
app.use(cors(corsOptions))

// Set up express-session
app.use(sessionMiddleware)

app.use(express.urlencoded({ extended: true }))
app.use(express.json({ limit: '5mb' }))
app.use(express.static('dist'))
app.use('/assets', express.static(path.resolve(__dirname, '../assets')))

app.use('/api', routes)

// Set up Mongoose connection
mongoose.connect(db, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})
	.then(() => console.log(`–––––––––––––––––––––––––\n** MongoDB connected **\n*************************\n\n`))
	.catch(err => console.log(err));

const io = new Server(server, {
	cors: corsOptions,
})

io.engine.use(sessionMiddleware)

let onlineUsers = []

// Set up Socket.IO
io.on('connection', (socket) => {

	socket.data.username = `guest-${socket.id}`
	console.log(`\n<< connection >> ${socket.data.username}`)

	socket.emit('new_connection')

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

	socket.on('new_socket_connected', data => {
		console.log(`<< new_socket_connected >>\n${JSON.stringify(data)}\n`)
		socket.data = data
		// if (!socket.data.userId)...
		// io.to(socketId).emit('check_status', data => {
		//   if (data.userId) {
		//     socket.data = data
		//     socket.broadcast.emit('update_user_status', data.userId, 'signed_in')
		//   }
		// })
		// io.emit('connection', username)
		// if (username) {
		//     console.log(`--> (${username}). emitting << add_socket >> to all users`)
		//     // socket.broadcast.emit('add_socket', username)
		// }
	})

	// socket.on('get_connected', async callback => {
	//   const sockets = await io.fetchSockets()
	//   callback(sockets)
	// })

	socket.on('list_connected_sockets', () => {
		console.log(`\n<< list_connected_sockets >>\n`)
		const connectedSockets = getAllSockets()
		// console.log('io.sockets', io.sockets)
		console.log('socket.handshake', socket.handshake.query.userId)
		// const connectedSockets = io.sockets.sockets.map(sock => sock.userId)
		console.log(`\nsockets: ${connectedSockets}\n`)
	})

	socket.on('user_signed_in', data => {
		socket.data = data
		console.log(`\n<< user_signed_in >>\n`)

		if (!onlineUsers.some(user => user.userId === data.userId)) {
			onlineUsers.push({ userId: data.userId, socketId: socket.id })
			console.log(`${data.userId} connected`)
		} else {
			console.log(`${data.userId} already connected`)
			socket.broadcast.emit('signed_in_user', data.userId)
		}

		console.log(`\n>> connected_users <<\n${onlineUsers.map(u => u.userId).toString().split(',').join(`\n`)}`)
		io.emit('connected_users', onlineUsers)
	})

	socket.on('user_added', user => {
		socket.broadcast.emit('added_user', user)
	})

	socket.on('status_change', id => {
		socket.broadcast.emit('changed_status', id)
	})

	socket.on('user_signed_out', (userId, callback) => {
		console.log(`\n<< user_signed_out >>\n${userId} signed out.\n>> connected_users <<\n`)
		onlineUsers = onlineUsers.filter(user => user.userId !== userId)
		socket.broadcast.emit('signed_out_user', userId)
		io.emit('connected_users', onlineUsers)
	})

	socket.on('new_order', order => {
		console.log(`\n<< new_order >>\n>> add_order <<`)
		socket.broadcast.emit('add_order', order)
	})

	socket.on('order_updated', order => {
		console.log(`\n<< order_updated >>\n>> updated_order <<\n`)
		socket.broadcast.emit('updated_order', order)
	})

	socket.on('order_removed', id => {
		console.log(`\n<< order_removed >>\n>> remove_order <<\n`)
		socket.broadcast.emit('remove_order', id)
	})

	socket.on('account_deleted', id => {
		console.log(`\n<< account_deleted >>\n>> deleted_account <<\n`)
		socket.broadcast.emit('deleted_account', id)
	})

	socket.on('new_entry', entry => {
		console.log(`\n<< new_entry >>\n${entry.author.username}: ${entry.text}\n>> add_entry <<\n`)
		socket.broadcast.emit('add_entry', entry)
	})

	socket.on('delete_entry', id => {
		console.log(`\n<< delete_entry >>\n${id}\n>> deleted_entry <<\n`)
		socket.broadcast.emit('deleted_entry', id)
	})

	socket.on('disconnect', reason => {
		console.log(`<< disconnect >>${socket.id}\n>> connected_users <<\n`, reason)
		onlineUsers = onlineUsers.filter(user => user.socketId !== socket.id)
		io.emit('connected_users', onlineUsers)
	})

	socket.on('offline', () => {
		onlineUsers = onlineUsers.filter(user => user.socketId !== socket.id)
		io.emit('connected_users', onlineUsers)
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
	console.log(`\n\n*************************\nServer running on port ${PORT}`)
})

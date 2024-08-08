const express = require('express')
const { createServer } = require('http')
const { Server } = require('socket.io')
const mongoose = require('mongoose')
const session = require('express-session')
const cors = require('cors')
const path = require('path')
const routes = require('./routes')
const socketHandler = require('./socketHandler')
require('dotenv').config()

const app = express()
const server = createServer(app)

const sessionMiddleware = session({
	secret: process.env.JWT_SECRET,
	resave: false,// set to true to reset session on every request
	saveUninitialized: true,
})

const corsOptions = {
	origin: [
		// 'wss://iameric.me',
		'http://localhost:3000',
		'http://localhost:4000',
		'https://iameric.me',
		'https://maps.googleapis.com',
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
mongoose.connect(process.env.DB_CONNECTION_STRING, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})
	.then(() => console.log(`–––––––––––––––––––––––––\n** MongoDB connected **\n*************************\n\n`))
	.catch(err => console.log(err));

const io = new Server(server, {
	cors: corsOptions,
})

io.engine.use(sessionMiddleware)

// let onlineUsers = []

const socketEventHandler = socketHandler(io)

// see socketHandler.js
io.on('connection', socketEventHandler)

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

server.listen(process.env.PORT, () => {
	console.log(`\n\n*************************\nServer running on port ${process.env.PORT}`)
})

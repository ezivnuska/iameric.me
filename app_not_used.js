const express = require('express')
const session = require('express-session')
const cors = require('cors')
const config = require('./config')

const SESSION_SECRET = process.env.JWT_SECRET || config.JWT_SECRET
const PORT = process.env.NODE_ENV === 'production' ? config.production.port : config.development.port

// Create Express server
const app = express()

// Set PORT
app.set('port', PORT)

// parse json request body
app.use(express.json())
// parse urlencoded request body
app.use(express.urlencoded({ extended: true }))

// Enable CORS
app.use(cors({ origin: '*' }))

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
    () => {
        // Incase of 500 Server Error
        // The Error is only logged in server and not sent in response to restrict error details being known in the frontend
        console.error(error);
        const status = 500;
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
    }
)

const sessionMiddleware = session({
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
})

app.use(sessionMiddleware)

app.use(express.urlencoded({ extended: true }))
app.use(express.json({ limit: '5mb' }))
app.use(cors({ origin: '*' }))
app.use(express.static('dist'))
app.use('/assets', express.static('./assets'))

module.exports = app
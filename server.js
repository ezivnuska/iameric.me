const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
// const bcrypt = require('bcrypt')
const session = require('express-session')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const SESSION_SECRET = process.env.JWT_SECRET || require('./config').JWT_SECRET
const db = process.env.DB_CONNECTION_STRING || require('./config').DB_CONNECTION_STRING
const gm = require('gm')
const path = require('path')
const PORT = process.env.PORT || require('./config').PORT

const { createServer } = require('http')
const app = express()
const server = createServer(app)

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors({ origin: true, credentials: true }))
app.use(express.static('dist'))
app.use('/assets', express.static('./assets'))

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}))

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
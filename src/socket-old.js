import { io } from 'socket.io-client'
import config from '../config'

// const path = process.env.NODE_ENV === 'production' ? undefined : `https://localhost:${config.PORT}`
const PORT = process.env.PORT || config.PORT
// const path = process.env.NODE_ENV === 'production' ? `https://iameric.me` : `http://localhost:${PORT}`
const path = process.env.NODE_ENV === 'production' ? `https://iameric.me` : `http://localhost:${PORT}`

console.log('process.env.NODE_ENV...', process.env.NODE_ENV)
console.log('PORT...', PORT)
console.log('path...', path)

const socket = io(path, {
    withCredentials: true,
})
// const socket = io()
// console.log(`\nsocket: ${socket}\n`)

socket.on('error', error => {
    console.log(`Socket error: ${error}`)
})

socket.on('connect_error', error => {
    if (socket.active) {
        // temporary disconnection. socket attempting reconnect
        console.log('socket error: temporary disconnection. attempting reconnect', error)
    } else {
        console.log('socket connection denied by server', error)
    }
})

socket.on('disconnect', reason => {
    if (socket.active) {
        // temporary disconnection. socket attempting reconnect
        console.log('socket diconnected. attempting reconnect', reason)
    } else {
        console.log('socket diconnected for reason', reason)
    }
})

export default socket
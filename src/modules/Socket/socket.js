import { io } from 'socket.io-client'

const path = process.env.NODE_ENV === 'production' ? undefined : `http://localhost:${4000}`

const socket = io(path, {
    transports: ['websocket'],
    upgrade: false,
    // multiplex: false,
    autoConnect: false,
    reconnection: false,
})

export default socket
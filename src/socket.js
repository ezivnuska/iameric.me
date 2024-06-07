import { io } from 'socket.io-client'
import clientConfig from './clientConfig'
const path = process.env.NODE_ENV === 'production' ? undefined : `http://localhost:${clientConfig.development.port}`
const socket = io(path)

// Event listeners
socket.on('connect', () => {
  console.log('Connected to server', socket.id)
  socket.emit('connected', socket.id)
})

socket.on('disconnect', () => {
  console.log('Disconnected from server')
})

socket.emit('message', 'Hello from client')

socket.on('message', (data) => {
  console.log('Message from server:', data)
})

// Close connection
// socket.close()

export default socket
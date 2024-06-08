import { io } from 'socket.io-client'
import clientConfig from './clientConfig'

const path = process.env.NODE_ENV === 'production' ? undefined : `http://localhost:${clientConfig.development.port}`
const socket = io(path)

// Event listeners
socket.on('new_connection', () => {
  // console.log(`\n<< new_connection >>\n${socket.id}\n`)
  socket.emit('new_socket_connected', socket.id)
  socket.emit('list_connected_sockets')
})

// socket.on('add_socket', socketId => {
//   console.log(`\n<< add_socket >>\nsocketId ${socketId} connected\n`)
// })

// socket.on('update_user_status', ({ status, userId }) => {
//   console.log(`\n<< update_user_status >>\nuserId: ${userId} --> ${status}`)
// })

// socket.on('connected_sockets_list', sockets => {
//   console.log(`\n<< connected_sockets_list >>\n${sockets.toString()}\n`)
// })

socket.on('disconnect', () => {
  console.log(`\n<< disconnect >> from server`)
  console.log(`update user status here...\n`)
})

socket.on('message', (data) => {
  console.log('Message from server:', data)
})

// Close connection
// socket.close()

export default socket
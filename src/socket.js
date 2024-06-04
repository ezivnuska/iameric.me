// Import socket.io-client
import { io } from 'socket.io-client'
import clientConfig from './clientConfig'
// const path = process.env.NODE_ENV === 'production' ? 'https://iameric.me' : 'http://localhost:3000'
// console.log('socket path:', path)
const port = process.env.NODE_ENV === 'production' ? clientConfig.production.port : clientConfig.development.port
// Connect to the server
// const socket = io('/'); // Change the URL to match your server
const socket = io(`http://localhost:${port}`); // Change the URL to match your server
// const socket = io()

// Event listeners
socket.on('connect', () => {
  console.log('Connected to server', socket.id);
  socket.emit('connected', socket.id)
});

socket.on('disconnect', () => {
  console.log('Disconnected from server');
});

// Example of sending data to the server
socket.emit('message', 'Hello from client');

// Example of receiving data from the server
socket.on('message', (data) => {
  console.log('Message from server:', data);
});

// Close connection
// socket.close();

export default socket
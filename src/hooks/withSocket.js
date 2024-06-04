// import React, { useEffect } from 'react'
// import { io } from 'socket.io-client'
// import {
// 	useSocket,
// 	useApp,
// } from '@context'

// const withSocket = Component => {

// 	const { addSocket, setConnected } = useSocket()
// 	const { profile } = useApp()

//     const path = process.env.NODE_ENV === 'production' ? undefined : `http://localhost:4321`
// 	// const path = `http://localhost:4321`
// 	const socket = io(path, {
// 		withCredentials: true,
// 	})

//     // useEffect(() => {
// 	// 	console.log('withSocket: username: ', profile?.username)
//     //     if (socket && profile) {
//     //         socket.emit('user_signed_in', profile.username)
//     //     }
//     // }, [profile])
	
// 	// socket.on('connect', () => {
//     //     console.log(`\n<< connect >>`)
// 	// 	setConnected(true)
// 	// })

// 	socket.on('add_socket', data => {
// 		console.log(`\n<< add_socket >>`, data)
// 		addSocket(data)
// 	})

// 	socket.on('error', error => {
//         console.log(`Socket error: ${error}`)
// 	})

// 	socket.on('connect_error', error => {
// 		if (socket.active) {
// 			// temporary disconnection. socket attempting reconnect
// 			console.log('socket error. attempting reconnect', error)
// 		} else {
// 			console.log('socket connection denied by server', error)
// 		}
// 	})

// 	socket.on('disconnect', reason => {
// 		if (socket.active) {
// 			// temporary disconnection. socket attempting reconnect
// 			console.log('socket diconnected. attempting reconnect', reason)
// 		} else {
// 			console.log('socket diconnected for reason', reason)
// 		}
// 	})

//     const WithSocket = props => {
//         return <Component {...props} />
//     }
//     return WithSocket
// }

// export default withSocket
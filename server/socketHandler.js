const socketHandler = io => socket => {

	// const SESSION_RELOAD_INTERVAL = 30 * 1000
	
	// helper methods

	const notifyClient = (name, ...args) => {
		// console.log(`\n> Client Only > ${name}`, ...args)
		socket.emit(name, ...args)
	}

	const notifyEveryone = (name, ...args) => {
		// console.log(`\n> Everyone > ${name}`, ...args)
		io.emit(name, ...args)
	}

	const notifyEveryoneElse = (name, ...args) => {
		// console.log(`\n> Everyone Else > ${name}`, ...args)
		socket.broadcast.emit(name, ...args)
	}
	
	const notifySocket = (name, socketId, data) => {
		// console.log(`\n> ${socketId} > ${name}`, ...args)
		socket.to(socketId).emit(name, data)
	}
	
	const notifySockets = (name, sockets, data) => {
		// console.log(`\n> ${sockets} > ${name}`, ...args)
		sockets.map(sock => {
			socket.to(sock).emit(name, data)
		})
	}

	// end helper methods

	const getSockets = async () => {
		const sockets = await io.fetchSockets()
		return sockets
	}

	const getDataFromConnections = async () => {
		const sockets = await getSockets()
		const connections = sockets.map(sock => sock.data)
		return connections
	}

	const getConnectionsWithUserId = async userId => {
		const connections = await getDataFromConnections()
		const connectionsWithUserId = connections.filter(connection => connection.userId && connection.userId === userId)
		return connectionsWithUserId
	}

	const getUserSocketIds = async userId => {
		const connectionsWithUserId = await getConnectionsWithUserId(userId)
		const socketIds = connectionsWithUserId.map(connection => connection.socketId)
		return socketIds
	}

	const sendConnections = async () => {
		const connections = await getDataFromConnections()
		notifyEveryone('refresh_connections', connections)
	}

	const refreshConnections = () => {
		sendConnections()
	}

	// fires on new socket connection

	const onConnected = async () => {

		socket.data.socketId = socket.id

		refreshConnections()
	}

	// const handleSignedOutUser = async userId => {
	// 	console.log('handleSignedOutUser ******', userId)
	// 	refreshConnections()
	// }

	// const onSignedOutUser = userId => {
	// 	handleSignedOutUser(userId)
	// 	refreshConnections()
	// }

	const onDisconnect = (reason, details) => {
		console.log(`socket disconnect: ${reason}${details ? `, ${details}` : ``}`)
		refreshConnections()
	}

	const isPrevId = async userId => {
		const socketIds = await getUserSocketIds(userId)
		return socketIds.filter(id => id !== socket.id).length > 0
	}

	const signOutPreviousSocketId = async userId => {
		socket.broadcast.to(prevId).emit('force_signout', userId)
	}

	const onUserConnected = async data => {
		
		// await signOutPreviousSocketId(data.userId)
		
		socket.data = {
			...socket.data,
			...data,
		}
		
		refreshConnections()
	}

	const onConnectionDetails = async user => {
		console.log('connection_details', user)
		
		const prevId = await isPrevId(user._id)

		if (prevId) {
			await signOutPreviousSocketId(user._id)
		}

		socket.data = {
			...socket.data,
			username: user.username,
			userId: user._id,
		}
		console.log('socket data', socket.data)
		
		refreshConnections()
	}

	const onUserSignedOut = async userId => {

		if (socket.data.userId === userId) {
			socket.data.username = null
			socket.data.userId = null
		}
		
		refreshConnections()
	}

	const onForcedSignoutComplete = async () => {

		socket.data.username = null
		socket.data.userId = null

		refreshConnections()
	}

	const onNewEntry = async entry => {
		io.emit('new_entry', entry)
	}

	const onEntryDeleted = async entry => {
		io.emit('deleted_entry', entry)
	}

	socket.on('disconnect', 				onDisconnect)
	socket.on('user_connected', 			onUserConnected)
	// socket.on('signed_out_user', 			onSignedOutUser)
	socket.on('connection_details', 		onConnectionDetails)
	socket.on('user_signed_out', 			onUserSignedOut)
	socket.on('forced_signout_complete', 	onForcedSignoutComplete)
	socket.on('new_entry', 					onNewEntry)
	socket.on('entry_deleted', 				onEntryDeleted)

	onConnected()
}

module.exports = socketHandler
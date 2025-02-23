const socketHandler = io => socket => {

	// let ip = socket.handshake.headers['x-forwarded-for'] || socket.handshake.address
	
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

	const refreshConnections = async () => {
		const connections = await getDataFromConnections()
		notifyEveryone('refresh_connections', connections)
	}

	// fires on new socket connection

	const onConnected = async () => {

		setSocketData({
			socketId: socket.id,
		})

		// refreshConnections()
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
		// refreshConnections()
	}

	const getPrevId = async userId => {
		const connections = await getUserSocketIds(userId)
		const prevId = connections.filter(id => id !== socket.id)[0]
		return prevId
	}

	const signOutPreviousSocketId = async userId => {
		const prevId = await getPrevId(userId)
		if (prevId) {
			socket.to(prevId).emit('force_signout', prevId)
		}
	}

	const setSocketData = data => {
		const socketData = {
			...socket.data,
			...data,
		}
		// console.log('socketData', socketData)
		socket.data = socketData

		refreshConnections()
	}

	const onUserConnected = async data => {
		
		// await signOutPreviousSocketId(data.userId)
		
		setSocketData(data)
	}

	const onConnectionDetails = async user => {
		
		const prevId = await getPrevId(user._id)

		if (prevId) {
			await signOutPreviousSocketId(user._id)
		}

		setSocketData({
			username: user.username,
			userId: user._id,
		})
	}

	const onUserSignedOut = async userId => {

		if (socket.data.userId === userId) {
			setSocketData({
				username: null,
				userId: null,
			})
			// socket.data.username = null
			// socket.data.userId = null
		}
		
	}

	const onForcedSignoutComplete = async () => {

		setSocketData({
			username: null,
			userId: null,
		})
		// socket.data.username = null
		// socket.data.userId = null

		// refreshConnections()
	}

	const onNewBip = async bip => {
		socket.broadcast.emit('new_bip', bip)
	}

	const onBipDeleted = async bip => {
		io.emit('deleted_bip', bip._id)
	}

	const onNewEntry = async entry => {
		socket.broadcast.emit('new_entry', entry)
	}

	const onNewPost = async post => {
		socket.broadcast.emit('new_post', post)
	}

	const onPostDeleted = async post => {
		io.emit('deleted_post', post)
	}

	const getSocketIdWithUserId = async userId => {
		
		const connections = await getDataFromConnections()
		let socketId = null
		connections.map(c => {
			if (c.userId === userId) {
				socketId = c.socketId
			}
		})
		return socketId
	}

	const onNewMessage = async data => {
		const receiverSocketId = await getSocketIdWithUserId(data.to._id)
		socket.broadcast.to(receiverSocketId).emit('new_message', data)
	}

	const onMessageDeleted = async message => {
		console.log('message deleted by sender', message.text)
		const receiverSocketId = await getSocketIdWithUserId(message.to._id)
		socket.broadcast.to(receiverSocketId).emit('deleted_message', message)
	}

	socket.on('disconnect', 				onDisconnect)
	socket.on('user_connected', 			onUserConnected)
	// socket.on('signed_out_user', 			onSignedOutUser)
	socket.on('connection_details', 		onConnectionDetails)
	socket.on('user_signed_out', 			onUserSignedOut)
	socket.on('forced_signout_complete', 	onForcedSignoutComplete)
	socket.on('new_bip', 					onNewBip)
	socket.on('bip_deleted', 				onBipDeleted)
	socket.on('new_entry', 					onNewEntry)
	socket.on('entry_deleted', 				onPostDeleted)
	socket.on('new_post', 					onNewEntry)
	socket.on('post_deleted', 				onPostDeleted)
	socket.on('message_deleted', 			onMessageDeleted)
	socket.on('new_message', 				onNewMessage)

	onConnected()
}

module.exports = socketHandler
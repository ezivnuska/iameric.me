const socketHandler = io => socket => {

	// const SESSION_RELOAD_INTERVAL = 30 * 1000
    let onlineUsers = []

	// const socketIdAbbr = String(socket.id).substring(socket.id.length - 3)

	// const anon =  `guest-${socketIdAbbr}`

	// save temporary identifier for user
	// socket.data.username = socket.id
	
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

	// end helper methods

	const getSockets = async () => {
		const sockets = await io.fetchSockets()
		return sockets
	}

	const getConnections = async () => {
		const sockets = await getSockets()
		const connections = sockets.map(sock => sock.data)
		return connections
	}
	
	const userIsOnline = socketId => {
		return onlineUsers.filter(user => user.socketId === socketId).length > 0
	}

	const addOnlineUser = user => {
		if (!userIsOnline(user.socketId)) {
			onlineUsers.push(user)
		}
		refreshConnections()
	}

	const removeOnlineUser = userId => {
		onlineUsers.filter(user => user.userId !== userId)
		refreshConnections()
	}

	const refreshConnections = async () => {
		const connections = await getConnections()
		notifyEveryone('fresh_connections', connections)
	} 

	const handleSignedInUser = data => {
		socket.data = {
			...socket.data,
			...data,
		}
		addOnlineUser(socket.data)
	}

	const onSignedInUser = data => {
		handleSignedInUser(data)
		notifyClient('signed_in_user_confirmed', socket.data)
	}

	const handleUserSignedOut = userId => {
		socket.data.userId = null
		socket.data.username = null
		removeOnlineUser(userId)
	}

	const connect = () => {
		socket.data.socketId = socket.id
		console.log(`
			< new client connected >
			${socket.id}
		`)
		notifyEveryoneElse('user_connected', socket.data)
		refreshConnections()
	}

	const onSignedOutUser = userId => {
		handleUserSignedOut(userId)
		notifyClient('signed_out_user_confirmed', userId)
	}
	
	const onRefreshConnections = async () => {
		refreshConnections()
	}

	const onDisconnect = (reason, details) => {
		console.log(`socket disconnect: ${reason}`)
		notifyEveryoneElse('user_disconnected', socket.data.socketId)
	}

	socket.on('signed_in_user', 		onSignedInUser)
	socket.on('signed_out_user', 		onSignedOutUser)
	socket.on('refresh_connections', 	onRefreshConnections)
	socket.on('disconnect', 			onDisconnect)

	connect()
}

module.exports = socketHandler
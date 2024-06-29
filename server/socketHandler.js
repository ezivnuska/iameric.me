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
		refreshConnections()
	}

	const onSignedInUser = data => {
		handleSignedInUser(data)
		// notifyEveryoneElse('signed_in_user_confirmed', data)
		// notifyClient('signed_in_user_confirmed', socket.data)
	}

	const handleUserSignedOut = userId => {
		socket.data.userId = null
		socket.data.username = null
		removeOnlineUser(userId)
	}

	const onConnected = () => {
		socket.data.socketId = socket.id
		console.log(`
			< new client connected >
			${socket.id}
		`)
		// notifyEveryoneElse('user_connected', socket.data)
		refreshConnections()
	}

	const onSignedOutUser = userId => {
		handleUserSignedOut(userId)
		notifyClient('signed_out_user_confirmed', userId)
		refreshConnections()
	}
	
	const onRefreshConnections = async () => {
		refreshConnections()
	}

	const onDisconnect = (reason, details) => {
		console.log(`socket disconnect: ${reason}`)
		notifyEveryoneElse('user_disconnected', socket.data.socketId)
		refreshConnections()
	}

	const onUserSignedIn = user => {
		console.log(`user signed in: ${user.username}`)
		notifyEveryoneElse('user_signed_in', user)
		refreshConnections()
	}

	const onUserSignedOut = userId => {
		console.log(`user signed out: ${userId}`)
		notifyEveryoneElse('user_signed_out', userId)
		refreshConnections()
	}

	socket.on('disconnect', 			onDisconnect)
	socket.on('refresh_connections', 	onRefreshConnections)
	socket.on('signed_in_user', 		onSignedInUser)
	socket.on('signed_out_user', 		onSignedOutUser)
	socket.on('user_signed_in', 		onUserSignedIn)
	socket.on('user_signed_out', 		onUserSignedOut)

	onConnected()
}

module.exports = socketHandler
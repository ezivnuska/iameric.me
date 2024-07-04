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

	const notifySockets = (name, sockets, data) => {
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
		const connectionDataArray = sockets.map(sock => sock.data)
		return connectionDataArray
	}
	
	const getAllDataFromConnectionsWithUserId = async userId => {
		const connections = await getDataFromConnections()
		const userConnections = connections.filter(conn => conn.userId === userId)
		return userConnections
	}

	const getDataFromConnectionsWithUserId = async userId => {
		const connections = await getDataFromConnections()
		const connectionsWithUserId = connections.filter(connection => connection.userId && connection.userId === userId)
		return connectionsWithUserId
	}

	const getUserSocketIds = async userId => {
		const connectionsWithUserId = await getDataFromConnectionsWithUserId(userId)
		const socketIds = connectionsWithUserId.map(connection => connection.socketId)
		return socketIds
	}
	
	const getMinimizedConnections = async () => {
		const connections = await getDataFromConnections()
		const array = []
		const minimized = connections.filter(connection => {
			if (!connection.username) return true
			else {
				const exists = array.indexOf(connection.username) > -1
				if (exists) return false
				else {
					array.push(connection.username)
					return true
				}
			}
		})
		return minimized
	}

	const sendConnections = async () => {
		const minimizedConnections = await getMinimizedConnections()
		notifyEveryone('refresh_connections', minimizedConnections)
	}

	const refreshConnections = () => {
		sendConnections()
	}

	const syncSocketsByUserId = async userId => {
		const connectionsWithUserId = await getDataFromConnectionsWithUserId(userId)
		const socketIds = connectionsWithUserId.map(connection => connection.socketId)
		const synchronizedConnections = connectionsWithUserId.map(connection => {{
			connection.sockets = socketIds
			return connection
		}})
		return synchronizedConnections
	}

	const onUserConnected = async data => {
		socket.data = {
			...socket.data,
			...data,
		}
		await syncSocketsByUserId(data.userId)
		refreshConnections()
	}

	// fires on new socket connection
	const onConnected = async () => {
		// const connections = await getDataFromConnections()

		socket.data.socketId = socket.id

		refreshConnections()
	}

	const handleSignedOutUser = async userId => {
		console.log('handleSignedOutUser ******', userId)
		refreshConnections()
	}

	const onSignedOutUser = userId => {
		handleSignedOutUser(userId)
		refreshConnections()
	}

	const onDisconnect = (reason, details) => {
		console.log(`socket disconnect: ${reason}${details ? `, ${details}` : ``}`)
		refreshConnections()
	}

	const userHasMultipleConnections = async userId => {
		const connectionData = await getAllDataFromConnectionsWithUserId(userId)
		return connectionData.length > 1
	}

	const onConnectionDetails = async user => {
		
		socket.data = {
			...socket.data,
			username: user.username,
			userId: user._id,
		}
		
		const userAlreadyConnected = await userHasMultipleConnections(user._id)
		if (userAlreadyConnected) {
			await syncSocketsByUserId(user._id)
		}

		refreshConnections()
	}

	const signOutAllSocketsWithUserId = async userId => {
		const socketIds = await getUserSocketIds(userId)
		socketIds.map(socketId => {
			socket.broadcast.to(socketId).emit('force_signout', socketId)
		})
		return true
	}

	const onUserSignedOut = async userId => {

		socket.data.username = null
		socket.data.userId = null
		socket.data.sockets = null
		
		if (userHasMultipleConnections(userId)) {
			await signOutAllSocketsWithUserId(userId)
		}
		
		refreshConnections()
	}

	const onForcedSignoutComplete = async () => {

		socket.data.username = null
		socket.data.userId = null
		socket.data.sockets = null

		refreshConnections()
	}

	socket.on('disconnect', 				onDisconnect)
	socket.on('user_connected', 			onUserConnected)
	socket.on('signed_out_user', 			onSignedOutUser)
	socket.on('connection_details', 		onConnectionDetails)
	socket.on('user_signed_out', 			onUserSignedOut)
	socket.on('forced_signout_complete', 	onForcedSignoutComplete)

	onConnected()
}

module.exports = socketHandler
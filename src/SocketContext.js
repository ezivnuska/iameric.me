import React, {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useReducer,
} from 'react'
import { ActivityIndicator } from 'react-native-paper'
import { useApp } from '@app'
import socket from './socket'

// import { getItem, getStoredToken, setItem } from '@utils/storage'

const initialState = {
    connected: false,
    connections: [],
    onlineUsers: [],
    socketId: null,
    socketLoaded: false,
    socketLoading: false,
    emit: () => {},
    notifySocket: () => {},
    signIn: () => {},
    signOut: () => {},
}

export const SocketContext = createContext(initialState)

export const useSocket = () => {
    const context = useContext(SocketContext)

    if (!context) throw new Error()
    return context
}

export const SocketContextProvider = ({ children }) => {

    const { user } = useApp()

    const [state, dispatch] = useReducer(reducer, initialState)

    const { connected } = state

    const setConnected = payload => {
        dispatch({ type: 'SET_CONNECTED', payload })
    }

    const setSocketId = payload => {
        dispatch({ type: 'SET_SOCKET_ID', payload })
    }

    const removeOnlineUser = payload => {
        dispatch({ type: 'REMOVE_ONLINE_USER', payload })
    }

    const setConnections = payload => {
        dispatch({ type: 'SET_CONNECTIONS', payload })
    }
    
    // const addConnection = payload => {
    //     dispatch({ type: 'ADD_CONNECTION', payload })
    // }

    // const addOnlineUser = payload => {
    //     dispatch({ type: 'ADD_ONLINE_USER', payload })
    // }

    // const updateConnection = (currentName, newName) => {
    //     dispatch({ type: 'UPDATE_CONNECTION', payload: { currentName, new: newName } })
    // }

    // const removeConnection = payload => {
    //     dispatch({ type: 'REMOVE_CONNECTION', payload })
    // }

    // const handleNewConnection = payload => {
    //     addConnection(payload)
    // }

    const connect = () => {
        if (!socket.connected) {
            console.log(`connecting socket - ${user ? 'user' : 'no user'}`)
            socket.connect()
        }
    }

    const handleConnection = message => {
        console.log(message)
        setSocketId(socket.id)
        if (!connected) setConnected(true)
        if (user) {
            console.log('user logged in; sending username to server...')
            socket.emit('signed_in_user', {
                userId: user._id,
                username: user.username,
            })
        }
    }

    const handleConnectionError = message => {
        console.log(message)
        if (socket.active) {
            // temporary failure, the socket will automatically try to reconnect
            console.log('socket still active. reconnecting...')
        } else {
            // the connection was denied by the server
            // in that case, `socket.connect()` must be manually called in order to reconnect
            console.log('connection denied by server.')
        }
    }

    const refreshConnections = () => {
        socket.emit('refresh_connections')
    }

    const onConnect = () => {
        handleConnection(`\n< connect >\n`)
        refreshConnections()
    }

    const onReconnect = () => {
        handleConnection(`\n< reconnect >\n`)
    }

    const onConnectError = err => {
        handleConnectionError(`< connect_error >\n${err}`)
    }

    const onDisconnect = (reason, details) => {
        handleConnectionError(`< disconnect >\nreason: ${reason}\ndetails: ${details}`)
    }

    const onSignedInUserConfirmed = data => {
        console.log('signed in user confirmed', data)
    }

    const onSignedOutUserConfirmed = data => {
        console.log('signed out user confirmed', data)
        removeOnlineUser(data)
    }

    const onFreshConnections = connections => {
        console.log('fresh connections', connections)
        setConnections(connections)
    }

    useEffect(() => {
        console.log(`
            ** SOCKET CONTEXT **
            state.connected: ${connected}
            socket.connected: ${socket.connected}
            user: ${user}
        `)
        
        if (!socket.connected) connect()
        else if(!connected) setConnected(true)
        
        socket.on('connect', onConnect)
        socket.on('connect_error', onConnectError)
        socket.on('reconnect', onReconnect)
        socket.on('disconnect', onDisconnect)

        socket.on('signed_in_user_confirmed', onSignedInUserConfirmed)
        socket.on('signed_out_user_confirmed', onSignedOutUserConfirmed)
        socket.on('fresh_connections', onFreshConnections)

        // socket.on('connect', () => {
        
        //     console.log(`is socket connected: ${socket.connected}`)
        //     console.log(`state.connected: ${connected}`)
        //     if (!connected) setConnected(true)
        // })

        // socket.on('connect_error', err => {
        //     console.log(`socket connection error\n${err}`)
        // })

        // socket.on('reconnect', () => {
        //     console.log('socket reconnected')
        //     setConnected(true)
        // })
        // socket.on('disconnect', () => {
        //     console.log('socket disconnected')
        //     setConnected(false)
        // })

        // console.log(`connecting socket - ${user ? 'user' : 'no user'}`)
        // if (!socket.connected) {
        //     socket.connect()
        // }

        // const handleClientConfirmed = data => {
        //     // updateConnection()
        //     updateConnection(state.socketId, data.username)
        //     // setConnected(true)
        //     setSocketId(true)
        // }

        // const handleClientConnected = async (data, connections) => {
        //     console.log('socket connected', data.username, user)
        //     console.log('user signed in', user)
        //     console.log('socket data.username', data.username)
        //     console.log('socket data.socketId', data.socketId)
            
        //     setConnections(connections)
            
        //     setSocketId(data.socketId)
        //     // setConnected(true)
        //     socket.emit('connection_reply', user ? user.username : null)
        // }

        // // when a connected guest signs in as user
        // const handleSignedInUser = payload => {

        //     const { _id, username } = payload

        //     const { oldName, newName } = username
            
        //     console.log(`user_signed_in: ${newName} ${state.connected}`)

        //     // setConnected(newName)
            
        //     updateConnection(oldName, newName)
            
        //     addOnlineUser(_id)
        // }

        // // when a connected guest signs in as user
        // const handleUserSignedIn = payload => {

        //     const { _id, username } = payload

        //     const { oldName, newName } = username
            
        //     console.log(`user_signed_in: ${newName} ${state.connected}`)

        //     // setConnected(newName)
            
        //     updateConnection(oldName, newName)
            
        //     addOnlineUser(_id)
        // }

        // // when a user signs out
        // const handleUserSignedOut = payload => {
            
        //     const { userId, username } = payload

        //     const { oldName, newName } = username

        //     console.log(`user_signed_out: ${oldName}`)

        //     updateConnection(oldName, newName)

        //     removeOnlineUser(userId)
        // }

        // const handleSignedOutUser = payload => {

        //     console.log(`signed_out_user: ${payload}`)

        //     updateConnection(state.connected, payload)
            
        //     // setConnected(payload)
        // }


        // const handleDisconnectedUser = payload => {

        //     console.log(`disconnected_user: ${payload}`)

        //     removeConnection(payload)
        // }

        // socket.on('client_confirmed',       handleClientConfirmed)
        // socket.on('client_connected',       handleClientConnected)
        // socket.on('new_connection',         handleNewConnection)
        // socket.on('user_signed_in',         handleUserSignedIn)
        // socket.on('signed_in_user',         handleSignedInUser)
        // socket.on('user_signed_out',        handleUserSignedOut)
        // socket.on('signed_out_user',        handleSignedOutUser)
        // socket.on('disconnected_user',      handleDisconnectedUser)

        dispatch({ type: 'SOCKET_LOADED' })
    }, [])

    const actions = useMemo(() => ({
        signIn: async user => {
            socket.emit('signed_in_user', {
                userId: user._id,
                username: user.username,
            })
            // updateConnection(state.connected, user.username)
        },
        emit: async (name, ...args) => {
            socket.emit(name, ...args)
        },
        notifySocket: async (eventName, ...args) => {
            socket.emit(eventName, ...args)
        },
        signOut: async userId => {
            socket.emit('signed_out_user', userId)

            // removeOnlineUser(userId)
        },
        // addConnection,
        // addOnlineUser,
        // removeConnection,
        // removeOnlineUser,
        // setConnected,
    }), [state, dispatch])

    return (
        <SocketContext.Provider
            value={{
                ...state,
                ...actions,
            }}
        >
            {state.socketLoaded
                ? children
                : <ActivityIndicator style={{ marginHorizontal: 'auto' }} />
            }

        </SocketContext.Provider>
    )
}

const reducer = (state, action) => {
    const { payload, type } = action
    console.log(`${type}${payload ? `: ${payload}` : ``}`)
    switch(type) {
        case 'SET_SOCKET_ID':
            return { ...state, socketId: payload }; break
        case 'SOCKET_LOADED':
            return { ...state, socketLoaded: true }; break
        case 'SET_CONNECTED':
            return { ...state, connected: payload }; break
        case 'ADD_ONLINE_USER': return {
            ...state,
                onlineUsers: [
                    ...state.onlineUsers,
                    payload,
                ],
            }
            break
        case 'REMOVE_ONLINE_USER':
            return {
                ...state,
                onlineUsers: state.onlineUsers
                    .filter(user => user.userId !== payload),
            }
            break
        case 'SET_ONLINE_USERS':
            return { ...state, onlineUsers: payload }; break
        case 'SET_CONNECTIONS':
            console.log('CONNECTIONS', payload)
            return { ...state, connections: payload }; break
        case 'ADD_CONNECTION':
            console.log(`adding connection: ${payload}`)
            const connectionExists = state.connections.indexOf(payload) > -1
            console.log(`connectionExists(${payload})`, connectionExists)
            if (connectionExists) return state
            return {
                ...state,
                connections: [
                    ...state.connections,
                    payload,
                ],
            }
            break
        case 'REMOVE_CONNECTION':
            return {
                ...state,
                connections: state.connections
                    .filter(user => user !== payload),
            }
            break
        case 'UPDATE_CONNECTION':
            const { currentName, newName } = payload
            console.log(`updating connection: ${currentName}->${newName}`)
            console.log(`currently connected: ${state.connected}`)
            let connections = state.connections
            console.log(`connections before:`, state.connections)
            const connectionIndex = state.connections.indexOf(currentName)
            console.log(`connectionIndex: ${connectionIndex}`)
            if (connectionIndex > -1) {
                connections = [
                    ...state.connections.slice(0, connectionIndex),
                    newName,
                    ...state.connections.slice(connectionIndex + 1),
                ]   
            }
            console.log(`connections after: ${connections}`)
            return { ...state, connections }
            break
        default:
            throw new Error()
    }
}
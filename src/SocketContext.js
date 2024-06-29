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

        dispatch({ type: 'SOCKET_LOADED' })
    }, [])

    const actions = useMemo(() => ({
        signIn: async user => {
            socket.emit('signed_in_user', {
                userId: user._id,
                username: user.username,
            })
        },
        emit: async (name, ...args) => {
            socket.emit(name, ...args)
        },
        notifySocket: async (eventName, ...args) => {
            socket.emit(eventName, ...args)
        },
        signOut: async userId => {
            socket.emit('signed_out_user', userId)
        },
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
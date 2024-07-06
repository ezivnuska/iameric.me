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

const initialState = {
    connections: [],
    socket: null,
    socketLoaded: false,
    socketLoading: false,
    notifySocket: () => {},
    signIn: () => {},
}

export const SocketContext = createContext(initialState)

export const useSocket = () => {
    const context = useContext(SocketContext)

    if (!context) throw new Error()
    return context
}

export const SocketContextProvider = ({ children }) => {

    const { user, setUser } = useApp()

    const [state, dispatch] = useReducer(reducer, initialState)

    const { connections } = state

    const setConnections = payload => {
        dispatch({ type: 'SET_CONNECTIONS', payload })
    }
    
    // fires when socket first connects

    const handleConnection = async (message = null) => {

        if (message) console.log(message)

        if (user) {

            // notify server of user details
            
            socket.emit('user_connected', {
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
            socket.connect()
        }
    }

    // fired upon connection event from server
    const onConnect = () => {
        handleConnection(`< connect >\n`)
    }

    const onReconnect = () => {
        handleConnection(`< reconnect >\n`)
    }

    const onReconnectAttempt = () => {
        handleConnection(`< reconnect_attempt >\n`)
    }

    const onConnectError = err => {
        handleConnectionError(`< connect_error >\n${err}`)
    }

    const onDisconnect = (reason, details) => {
        handleConnectionError(`< disconnect >\nreason: ${reason}\ndetails: ${details}\n`)
    }

    const onRefreshConnections = connections => {
        setConnections(connections)
    }

    const onForceSignout = socketId => {
        console.log(`signing out previous scoket connection: ${socketId}`)
        if (socket.id === socketId) {
            setUser(null)
            socket.emit('forced_signout_complete', socketId)
        }
    }

    useEffect(() => {
        
        socket.on('connect',                    onConnect)
        socket.on('connect_error',              onConnectError)
        socket.on('force_signout',              onForceSignout)
        socket.on('reconnect',                  onReconnect)
        socket.on('reconnect_attempt',          onReconnectAttempt)
        socket.on('disconnect',                 onDisconnect)

        socket.on('refresh_connections',        onRefreshConnections)

        if (!socket.connected) socket.connect()

        dispatch({ type: 'SOCKET_LOADED' })
    }, [])

    useEffect(() => {
        if (user) {
            console.log(`${user.username} signed in; sending details...`)
            socket.emit('connection_details', user)
        }
    }, [user])

    const actions = useMemo(() => ({
        notifySocket: async (eventName, ...args) => {
            socket.emit(eventName, ...args)
        },
    }), [state, dispatch])
    
    return (
        <SocketContext.Provider
            value={{
                ...state,
                connections,
                socket,
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
    // console.log(`${type}${payload ? `: ${payload}` : ``}`)
    switch(type) {
        case 'SOCKET_LOADED':
            return { ...state, socketLoaded: true }; break
        case 'SET_CONNECTIONS':
            return { ...state, connections: payload }; break
        default:
            throw new Error()
    }
}
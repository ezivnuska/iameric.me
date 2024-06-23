import React, {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useReducer,
} from 'react'
import { ActivityIndicator } from 'react-native-paper'
import { io } from 'socket.io-client'

const path = process.env.NODE_ENV === 'production' ? undefined : `http://localhost:${4000}`

// import { getItem, getStoredToken, setItem } from '@utils/storage'

// import socket from './utils/socket'

const initialState = {
    connected: false,
    connections: [],
    onlineUsers: [],
    socketLoaded: false,
    socketLoading: false,
}

export const SocketContext = createContext(initialState)

export const useSocket = () => {
    const context = useContext(SocketContext)

    if (!context) throw new Error()
    return context
}

export const SocketContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        if (state.connected && state.connections.length) dispatch({ type: 'SOCKET_LOADED' })
    }, [state.connected, state.connections])

    useEffect(() => {

        const socket = io(path, {
            transports: ['websocket'],
            upgrade: false,
            multiplex: false,
        })

        socket.on('connected', username => {

            console.log(`you are connected as ${username}`)
            
            dispatch({ type: 'SET_CONNECTED', payload: username })
            
            socket.emit('get_connected_users')
            
        })
        
        socket.on('connected_users', payload => {
            
            dispatch({ type: 'SET_CONNECTIONS', payload })
        })

        // a new user connected to socket
        socket.on('new_connection', username => {

            socket.emit('get_connected_users')
            // if (userId) {
            //     socket.emit('user_signed_in', {
            //         userId,
            //         username: profile.username,
            //     })
            // }
        })

        socket.on('disconnected_user', username => {

            console.log(`${username} disconnected`)
        })


        socket.on('online_users', payload => {
            
            dispatch({ type: 'SET_ONLINE_USERS', payload })
        })

    }, [])

    // const actions = useMemo(() => ({
    //     // addConnection: async payload => {
    //     //     dispatch({ type: 'ADD_CONNECTION', payload })
    //     // },
    //     // removeConnection: async payload => {
    //     //     dispatch({ type: 'REMOVE_CONNECTION', payload })
    //     // },
    //     // setConnected: async payload => {
    //     //     dispatch({ type: 'SET_CONNECTED', payload })
    //     // },
    //     // setOnlineUsers: async payload => {
    //     //     dispatch({ type: 'SET_ONLINE_USERS', payload })
    //     // },
    // }), [state, dispatch])

    return (
        <SocketContext.Provider
            value={{
                ...state,
                // ...actions,
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
    switch(type) {
        case 'SOCKET_LOADED':
            return {
                ...state,
                socketLoaded: true,
            }
            break
        case 'SET_CONNECTED':
            return {
                ...state,
                connected: payload,
            }
            break
        case 'SET_ONLINE_USERS':
            return {
                ...state,
                onlineUsers: payload,
            }
            break
        case 'SET_CONNECTIONS':
            return {
                ...state,
                connections: payload,
            }
            break
        case 'ADD_CONNECTION':
            const connectionExists = state.connections.indexOf(payload) > -1
            console.log('connectionExists', connectionExists)
            if (!connectionExists) return state
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
                connections: state.connections.filter(user => user !== payload),
            }
            break
        default:
            throw new Error()
    }
}
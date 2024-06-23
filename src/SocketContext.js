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
    socketLoaded: false,
    socketLoading: false,
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

    useEffect(() => {
        if (user) {
            socket.emit('user_signed_in', user._id, user.username)
            dispatch({ type: 'SET_CONNECTED', payload: user.username })
        }
    }, [user])

    useEffect(() => {

        socket.on('connected', username => {

            // console.log(`you are connected as ${username}`)
            
            dispatch({ type: 'SET_CONNECTED', payload: user ? user.username : username })

            if (user) socket.emit('user_signed_in', user._id, user.username)
            socket.emit('get_connected_users')
        })
        
        socket.on('connected_users', payload => {
            dispatch({ type: 'SET_CONNECTIONS', payload })
        })

        socket.on('online_users', payload => {
            dispatch({ type: 'SET_ONLINE_USERS', payload })
        })

        socket.on('signed_in_user', (userId, username) => {
            socket.emit('get_online_users')
        })
        
        socket.on('signed_out_user', username => {
            socket.emit('get_online_users')
        })

        socket.on('set_connected', username => {
            dispatch({ type: 'SET_CONNECTED', payload: username })
        })

        // a new user connected to socket
        // socket.on('new_connection', username => {

        //     socket.emit('get_connected_users')
        //     if (user) {
        //         socket.emit('user_signed_in', user._id, user.username)
        //     }
        // })

        // socket.on('disconnected_user', username => {

        //     // console.log(`${username} disconnected`)
        //     // socket.emit('get_connected_users')
        // })


        socket.on('online_users', payload => {
            
            dispatch({ type: 'SET_ONLINE_USERS', payload })
        })

        dispatch({ type: 'SOCKET_LOADED' })
    }, [])

    const actions = useMemo(() => ({
        signOut: async payload => {
            socket.emit('user_signed_out', payload)
        },
        // addConnection: async payload => {
        //     dispatch({ type: 'ADD_CONNECTION', payload })
        // },
        // removeConnection: async payload => {
        //     dispatch({ type: 'REMOVE_CONNECTION', payload })
        // },
        // setConnected: async payload => {
        //     dispatch({ type: 'SET_CONNECTED', payload })
        // },
        // setOnlineUsers: async payload => {
        //     dispatch({ type: 'SET_ONLINE_USERS', payload })
        // },
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
    switch(type) {
        case 'SOCKET_LOADED':
            return {
                ...state,
                socketLoaded: true,
            }
            break
        case 'SET_CONNECTED':
            console.log('connected', payload)
            return {
                ...state,
                connected: payload,
            }
            break
        // case 'ADD_ONLINE_USER':
        //     return {
        //         ...state,
        //         onlineUsers: [ ...state.onlineUsers, payload ],
        //     }
        //     break
        // case 'REMOVE_ONLINE_USER':
        //     return {
        //         ...state,
        //         onlineUsers: state.onlineUsers.filter(user => user !== payload),
        //     }
        //     break
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
        // case 'ADD_CONNECTION':
        //     const connectionExists = state.connections.indexOf(payload) > -1
        //     console.log('connectionExists', connectionExists)
        //     if (!connectionExists) return state
        //     return {
        //         ...state,
        //         connections: [
        //             ...state.connections,
        //             payload,
        //         ],
        //     }
        //     break
        // case 'REMOVE_CONNECTION':
        //     return {
        //         ...state,
        //         connections: state.connections.filter(user => user !== payload),
        //     }
        //     break
        // case 'UPDATE_CONNECTION':
        //     const oldName = state.connected
        //     return {
        //         ...state,
        //         connections: state.connections.map(user => user === oldName ? payload : user),
        //         connected: payload,
        //     }
        //     break
        default:
            throw new Error()
    }
}
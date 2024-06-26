import React, { createContext, useContext, useEffect, useMemo, useReducer } from 'react'
import { useApp, useOrders } from '@context'

const initialState = {
    connected: null,
    sockets: [],
    error: null,
    socketsLoaded: false,
    socketsLoading: false,
    addSocket: () => {},
    setConnected: () => {},
    clearSockets: () => {},
    getSocket: () => {},
    removeSocket: () => {},
    setSockets: () => {},
    setSocketsLoading: () => {},
}

export const SocketContext = createContext(initialState)

export const useSocket = () => {
    const context = useContext(SocketContext)
    if (!context) {
        throw new Error()
    }
    return context
}

export const SocketContextProvider = props => {

    const { profile, socket, userId } = useApp()
    const { addOrder, removeOrder } = useOrders()

    const [state, dispatch] = useReducer(reducer, initialState)
    
    socket.on('new_connection', () => {
        console.log(`\n<< new_connection >>\n${socket.id}`)
        if (profile) {
            console.log('profile--->', profile)
            socket.emit('user_signed_in', {
                userId: profile._id,
                username: profile.username,
            })
        }
    })

    socket.on('add_order', data => {
        console.log('adding order', data)
        addOrder(data)
    })

    socket.on('remove_order', id => {
        console.log('<< remove_order >> removing order...')
        removeOrder(id)
    })

	useEffect(() => {
		if (socket && userId) {
            console.log('emitting user signed in from', profile.username)
            socket.broadcast.emit('user_signed_in', {
                userId,
                username: profile.username,
            })
        }
	}, [socket, userId])

    const actions = useMemo(() => ({
        addSocket: payload => {
            console.log(`\nadding socket`)
            console.log(`${payload}\n`)
            dispatch({ type: 'ADD_SOCKET', payload })
        },
        clearSockets: () => {
            dispatch({ type: 'RESET' })
        },
        removeSocket: payload => {
            dispatch({ type: 'REMOVE_SOCKET', payload })
        },
        setSockets: payload => {
            dispatch({ type: 'SET_SOCKET', payload })
            if (!state.socketsLoaded) dispatch({ type: 'SET_SOCKETS_LOADED' })
        },
        setConnected: payload => {
            dispatch({ type: 'SET_SOCKET_CONNECTED', payload })
        },
        setSocketsLoading: payload => {
            dispatch({ type: 'SET_SOCKETS_LOADING', payload })
        },
    }), [state, dispatch])

    return (
        <SocketContext.Provider value={{ ...state, ...actions }}>
            {props.children}
        </SocketContext.Provider>
    )
}

const reducer = (state, action) => {
    const { type, payload } = action
    switch(type) {
        case 'SET_SOCKETS_LOADING':
            return {
                ...state,
                socketsLoading: payload,
            }
            break
        case 'SET_SOCKETS_LOADED':
            return {
                ...state,
                socketsLoaded: true,
            }
            break
        case 'SET_SOCKET_CONNECTED':
            return {
                ...state,
                connected: payload,
            }
            break
        case 'REMOVE_SOCKET':
            const sockets = state.sockets.filter(socket => socket._id !== payload)
            return {
                ...state,
                sockets,
            }
            break
        case 'SET_SOCKETS':
            return {
                ...state,
                sockets: payload,
            }
            break
        case 'ADD_SOCKET':
            return {
                ...state,
                sockets: [ ...state.sockets, payload ],
            }
            break
        case 'RESET':
            return {
                ...state,
                sockets: [],
                socketsLoaded: false,
            }
        default:
            throw new Error()
    }
}
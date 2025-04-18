import React, {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useReducer,
} from 'react'

import { Audio } from 'expo-av'
import { Paths } from '@constants'

const initialState = {
    notifications: [],
    notificationsLoaded: false,
    addNotification: () => {},
    nextNotification: () => {},
    removeNotification: () => {},
}

export const NotificationContext = createContext(initialState)

export const useNotification = () => {
    const context = useContext(NotificationContext)

    if (!context) throw new Error()
    return context
}

const playSound = async () => {
    const sound = new Audio.Sound()

    try {
        await sound.loadAsync(`${Paths.SOUNDS}/bell.mp3`, { shouldPlay: true })
        await sound.unloadAsync()
    } catch (error) {
        console.error('AUDIO PLAY: ', error)
    }
}

export const NotificationContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, initialState)
    const { notifications } = state

    const notification = useMemo(() => notifications[0], [notifications])

    // let timer = undefined

    useEffect(() => {
        dispatch({ type: 'NOTIFICATIONS_LOADED' })
    }, [])

    // useEffect(() => {
    //     if (notification) {
    //         if (!timer) startTimer()
    //     } else {
    //         clearTimeout(timer)
    //         timer = undefined
    //     }
    // }, [notifications])

    const addNotification = payload => {
        // playSound()
        dispatch({ type: 'ADD_NOTIFICATION', payload })
    }

    const removeNotification = payload => {
        dispatch({ type: 'REMOVE_NOTIFICATION', payload })
    }

    const nextNotification = () => {
        dispatch({ type: 'NEXT_NOTIFICATION' })
    }

    // const startTimer = () => {
    //     timer = setTimeout(removeNotification(), DURATION)
    // }
    
    const actions = useMemo(() => ({
        addNotification,
        nextNotification,
        removeNotification,
    }), [state, dispatch])
    
    return (
        <NotificationContext.Provider
            value={{
                ...state,
                notification,
                ...actions,
            }}
        >
            {state.notificationsLoaded && children}

        </NotificationContext.Provider>
    )
}

const reducer = (state, action) => {
    const { payload, type } = action
    // console.log(`${type}${payload ? `: ${payload}` : ``}`)
    switch(type) {
        case 'SET_NOTIFICATIONS_LOADED':
            return { ...state, notificationsLoaded: true }
            break
        case 'ADD_NOTIFICATION':
            return {
                ...state,
                notifications: [
                    ...state.notifications,
                    payload,
                ],
            }
            break
        case 'NEXT_NOTIFICATION':
            return {
                ...state,
                notifications: state.notifications.slice(1),
            }
            break
        case 'NOTIFICATIONS_LOADED':
            return { ...state, notificationsLoaded: true }
            break
        case 'REMOVE_NOTIFICATION':
            return {
                ...state,
                notifications: state.notifications.filter((note, index) => index !== payload),
            }
            break
        default:
            throw new Error()
    }
}
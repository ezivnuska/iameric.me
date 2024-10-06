import React, {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useReducer,
} from 'react'
import {
    DarkTheme as NavigationDarkTheme,
    DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native'
import {
    // ActivityIndicator,
    MD2DarkTheme,
    MD2LightTheme,
} from 'react-native-paper'
import { getItem, getStoredToken, setItem } from '@utils/storage'
import { validateToken } from '@utils/auth'

import { dark, light } from '@styles/colors'
import merge from 'deepmerge'
import { useWindowDimensions } from 'react-native'
import { useNotification } from '@notification'

// import iconFont from './fonts/Ionicons.ttf'
// import iconFont from 'react-native-vector-icons/Fonts/MaterialCommunityIcons.ttf'
import { useFonts } from 'expo-font'
import Ionicons from './fonts/Ionicons.ttf'

// import socket from '../socket'

const defaultTheme = merge(MD2LightTheme, NavigationDefaultTheme)
const darkTheme = merge(MD2DarkTheme, NavigationDarkTheme)

const CombinedDefaultTheme = merge(defaultTheme, light)
const CombinedDarkTheme = merge(darkTheme, dark)

const initialState = {
    dark: false,
    appLoaded: false,
    theme: CombinedDefaultTheme,
    user: null,
    reset: () => {},
    setUser: () => {},
    setProfileImage: () => {},
    toggleTheme: () => {},
    updateUser: () => {},
}

export const AppContext = createContext(initialState)

export const useApp = () => {
    const context = useContext(AppContext)
    if (!context) throw new Error()
    return context
}

export const AppContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, initialState)
    
    const { addNotification } = useNotification()

    const dims = useWindowDimensions()

    const [fontsLoaded] = useFonts({
        'Ionicons': Ionicons,
        // 'MaterialCommunityIcons': require('react-native-vector-icons/build/MaterialCommunityIcons'),
    })

    const init = async () => {
        
        let storedValue = await getItem('dark')

        if (storedValue && storedValue === 'true') dispatch({ type: 'TOGGLE_THEME' })
        else await setItem('dark', false)

        const token = await getStoredToken()
        
        if (token) {
            console.log('found token.')

            // WE DON'T NEED TO VALIDATE TOKEN, YET
            
            // FOR NOW WE'RE JUST FAKING IT

            // dispatch({ type: 'SET_TOKEN', payload})
            const user = await validateToken(token)
            
            if (user) {
                console.log('token verified.')
                
                dispatch({
                    type: 'SET_USER',
                    payload: user,
                })

            } else {
                console.log('validation failed')
            }

            // SO FOR NOW...
            // dispatch({ type: 'SET_TOKEN', payload: true })
        } else {
            console.log('no token found')
            // dispatch({ type: 'SET_TOKEN', payload: false })
        }
        
        dispatch({ type: 'APP_LOADED' })
    }

    useEffect(() => {
        if (fontsLoaded) init()
    }, [fontsLoaded])

    // useEffect(() => {
        
    //     init()
    // }, [])

    const reset = () => {
        dispatch({ type: 'RESET' })
    }

    const setUser = payload => {
        dispatch({ type: 'SET_USER', payload })
    }
    
    const setProfileImage = payload => {
        dispatch({ type: 'SET_PROFILE_IMAGE', payload })
    }
    
    const toggleTheme = async () => {
        setItem('dark', !state.dark)
        dispatch({ type: 'TOGGLE_THEME' })
        // addNotification(`Changed to ${!state.dark ? 'dark' : 'light'} theme`)
    }
    
    const updateUser = payload => {
        dispatch({ type: 'UPDATE_USER', payload })
        
        // used only for dev purposes
        const keys = Object.keys(payload)
        // addNotification(`User ${keys.toString()} updated`)
    }

    const actions = useMemo(() => ({
        reset,
        setProfileImage,
        setUser,
        toggleTheme,
        updateUser,
    }), [state, dispatch])

    return (
        <AppContext.Provider
            value={{
                ...state, // stuff from initial state
                dims, // anything extra...
                ...actions,
            }}
        >
            {state.appLoaded && children}
        </AppContext.Provider>
    )
}

const reducer = (state, action) => {
    const { payload, type } = action
    // console.log(`${type}${payload ? `: ${payload}` : ``}`)
    switch(type) {
        case 'RESET': return { ...state, user: null }; break
        case 'APP_LOADED': return { ...state, appLoaded: true }; break
        case 'SET_PROFILE_IMAGE':
            return {
                ...state,
                user: {
                    ...state.user,
                    profileImage: payload,
                },
            }
            break
        case 'SET_TOKEN': return { ...state, token: payload }; break
        case 'SET_USER': return { ...state, user: payload }; break
        case 'TOGGLE_THEME':
            return {
                ...state,
                dark: !state.dark,
                theme: !state.dark
                ? CombinedDarkTheme
                : CombinedDefaultTheme,
            }
            break
        case 'UPDATE_USER':
            return {
                ...state,
                user: {
                    ...state.user,
                    payload,
                },
            }
            break
        default: throw new Error()
    }
}
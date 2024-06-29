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
    ActivityIndicator,
    MD2DarkTheme,
    MD2LightTheme,
} from 'react-native-paper'
import { getItem, getStoredToken, setItem } from '@utils/storage'
import { validateToken } from '@utils/auth'

import { dark, light } from '@styles/colors'
import merge from 'deepmerge'
import { useWindowDimensions } from 'react-native'
// import { SocketContextProvider } from './SocketContext'

// import socket from '../socket'

const defaultTheme = merge(MD2LightTheme, NavigationDefaultTheme)
const darkTheme = merge(MD2DarkTheme, NavigationDarkTheme)

const CombinedDefaultTheme = merge(defaultTheme, light)
const CombinedDarkTheme = merge(darkTheme, dark)

const initialState = {
    dark: false,
    appLoaded: false,
    theme: CombinedDefaultTheme,
    // token: null,
    user: null,
    // setToken: () => {},
    setUser: () => {},
    toggleTheme: () => {},
}

export const AppContext = createContext(initialState)

export const useApp = () => {
    const context = useContext(AppContext)
    if (!context) throw new Error()
    return context
}

export const AppContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, initialState)

    const dims = useWindowDimensions()

    useEffect(() => {

        const init = async () => {
            
            let storedValue = await getItem('dark')

            if (storedValue && storedValue === 'true') dispatch({ type: 'TOGGLE_THEME' })
            else await setItem('dark', false)

            const payload = await getStoredToken()
            
            if (payload) {
                console.log('found token.')

                // WE DON'T NEED TO VALIDATE TOKEN, YET
                
                // FOR NOW WE'RE JUST FAKING IT

                // dispatch({ type: 'SET_TOKEN', payload})
                const user = await validateToken(payload)
                if (user) {
                    console.log('token verified.')
                    
                    dispatch({
                        type: 'SET_USER',
                        payload: user,
                    })
                }

                // SO FOR NOW...
                // dispatch({ type: 'SET_TOKEN', payload: true })
            } else {
                console.log('no token found')
                // dispatch({ type: 'SET_TOKEN', payload: false })
            }

            dispatch({ type: 'APP_LOADED' })
        }
        
        init()
    }, [])

    const actions = useMemo(() => ({
        // setToken: async payload => {
        //     dispatch({ type: 'SET_TOKEN', payload })
        // },
        setUser: async payload => {
            dispatch({ type: 'SET_USER', payload })
        },
        toggleTheme: async () => {
            setItem('dark', !state.dark)
            dispatch({ type: 'TOGGLE_THEME' })
        },
    }), [state, dispatch])

    return (
        <AppContext.Provider
            value={{
                ...state, // stuff from initial state
                dims, // anything extra...
                ...actions,
            }}
        >
            {state.appLoaded
                ? children
                : <ActivityIndicator style={{ marginHorizontal: 'auto' }} />
            }

        </AppContext.Provider>
    )
}

const reducer = (state, action) => {
    const { payload, type } = action
    console.log(`${type}${payload ? `: ${payload}` : ``}`)
    switch(type) {
        case 'APP_LOADED':
            return {
                ...state,
                appLoaded: true,
            }
            break
        case 'SET_TOKEN':
            return {
                ...state,
                token: payload,
            }
            break
        case 'SET_USER':
            return {
                ...state,
                user: payload,
            }
            break
        case 'TOGGLE_THEME':
            return {
                ...state,
                dark: !state.dark,
                theme: !state.dark
                    ? CombinedDarkTheme
                    : CombinedDefaultTheme,
            }
            break
        default:
            throw new Error()
    }
}
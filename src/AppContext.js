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
import { getItem, setItem } from '@utils/storage'

import { dark, light } from '@styles/colors'
import merge from 'deepmerge'
import { useWindowDimensions } from 'react-native'

// import socket from '../socket'

const defaultTheme = merge(MD2LightTheme, NavigationDefaultTheme)
const darkTheme = merge(MD2DarkTheme, NavigationDarkTheme)

const CombinedDefaultTheme = merge(defaultTheme, light)
const CombinedDarkTheme = merge(darkTheme, dark)

const initialState = {
    dark: false,
    appLoaded: false,
    theme: CombinedDefaultTheme,
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

            dispatch({ type: 'APP_LOADED' })
        }
        
        init()
    }, [])

    const actions = useMemo(() => ({
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
            {
                // wait until app is loaded (dims, theme, etc.) 
                // before showing content
                !state.appLoaded
                    ? <ActivityIndicator style={{ marginHorizontal: 'auto' }} />
                    : children
            }
        </AppContext.Provider>
    )
}

const reducer = (state, action) => {
    const { payload, type } = action
    switch(type) {
        case 'APP_LOADED':
            return {
                ...state,
                appLoaded: true,
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
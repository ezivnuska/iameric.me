import React, {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useReducer,
} from 'react'
// import {
//     DarkTheme as NavigationDarkTheme,
//     DefaultTheme as NavigationDefaultTheme,
// } from '@react-navigation/native'
// import {
//     // ActivityIndicator,
//     MD2DarkTheme,
//     MD2LightTheme,
// } from 'react-native-paper'
// import { getItem, setItem } from '@utils/storage'

// import { dark, light } from '@styles/colors'
// import merge from 'deepmerge'
// import { useWindowDimensions } from 'react-native'
// import { useNotification } from '@context'

import { useFonts } from 'expo-font'
import Ionicons from '../fonts/Ionicons.ttf'

// const defaultTheme = merge(MD2LightTheme, NavigationDefaultTheme)
// const darkTheme = merge(MD2DarkTheme, NavigationDarkTheme)

// const CombinedDefaultTheme = merge(defaultTheme, light)
// const CombinedDarkTheme = merge(darkTheme, dark)

// import {
//     CombinedDefaultTheme,
//     CombinedDarkTheme,
// } from '@styles/theme'

const initialState = {
    appLoaded: false,
    authRoute: null,
    currentRoute: null,
    lastRoute: null,
    // dark: false,
    // theme: CombinedDefaultTheme,
    setAuthRoute: () => {},
    setCurrentRoute: () => {},
    // toggleTheme: () => {},
}

export const AppContext = createContext(initialState)

export const useApp = () => {
    const context = useContext(AppContext)
    if (!context) throw new Error()
    return context
}

export const AppContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, initialState)

    // const dims = useWindowDimensions()

    // const landscape = useMemo(() => dims && dims.width > dims.height, [dims])

    const [fontsLoaded] = useFonts({
        'Ionicons': Ionicons,
    })

    const init = async () => {
        
        // let storedValue = await getItem('dark')

        // if (storedValue && storedValue === 'true') dispatch({ type: 'TOGGLE_THEME' })
        // else await setItem('dark', false)
        
        dispatch({ type: 'APP_LOADED' })
        console.log('app loaded')
    }

    useEffect(() => {
        if (fontsLoaded) init()
    }, [fontsLoaded])

    // useEffect(() => {
    //     console.log('dims*', dims)
    // }, [dims])
    
    // const toggleTheme = async () => {
    //     setItem('dark', !state.dark)
    //     dispatch({ type: 'TOGGLE_THEME' })
    // }

    const actions = useMemo(() => ({
        // toggleTheme,
        setAuthRoute: payload => {
            dispatch({
                type: 'SET_AUTH_ROUTE',
                payload,
            })
        },
        setCurrentRoute: payload => {
            dispatch({
                type: 'SET_CURRENT_ROUTE',
                payload,
            })
        },
    }), [state, dispatch])

    return (
        <AppContext.Provider
            value={{
                ...state, // stuff from initial state
                // dims,
                // landscape,
                ...actions,
            }}
        >
            {state.appLoaded && children}
        </AppContext.Provider>
    )
}

const reducer = (state, action) => {
    const { type, payload } = action
    switch(type) {
        case 'APP_LOADED': return { ...state, appLoaded: true }; break
        // case 'TOGGLE_THEME':
        //     return {
        //         ...state,
        //         dark: !state.dark,
        //         theme: !state.dark
        //         ? CombinedDarkTheme
        //         : CombinedDefaultTheme,
        //     }
        //     break
        case 'SET_AUTH_ROUTE':
            return {
                ...state,
                authRoute: payload,
            }
            break
        case 'SET_CURRENT_ROUTE':
            return {
                ...state,
                currentRoute: payload,
                lastRoute: state.currentRoute,
            }
            break
        default: throw new Error()
    }
}
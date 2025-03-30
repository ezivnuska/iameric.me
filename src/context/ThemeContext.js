import React, {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useReducer,
    useState,
} from 'react'
import { Dimensions, useWindowDimensions } from 'react-native'
import { getItem, setItem } from '@utils/storage'
import {
    DarkTheme as NavigationDarkTheme,
    DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native'
import {
    MD3DarkTheme,
    MD3LightTheme,
    adaptNavigationTheme } from 'react-native-paper'
import merge from 'deepmerge'
import { Colors } from '@constants'

const customDarkTheme = { ...MD3DarkTheme, colors: Colors.dark }
const customLightTheme = { ...MD3LightTheme, colors: Colors.light }

const { LightTheme, DarkTheme } = adaptNavigationTheme({
    reactNavigationLight: NavigationDefaultTheme,
    reactNavigationDark: NavigationDarkTheme,
})

const CombinedLightTheme = merge(LightTheme, customLightTheme)
const CombinedDarkTheme = merge(DarkTheme, customDarkTheme)

const initialState = {
    dark: false,
    dims: null,
    theme: CombinedLightTheme,
    themeLoaded: false,
    setTheme: () => {},
    toggleTheme: () => {},
}

export const ThemeContext = createContext(initialState)

export const useTheme = () => {
    const context = useContext(ThemeContext)
    if (!context) throw new Error()
    return context
}

export const ThemeContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, initialState)

    const windowDimensions = useWindowDimensions()

    const [dimensions, setDimensions] = useState(null)
    const [landscape, setLandscape] = useState(null)

    useEffect(() => {
        init()
    }, [])

    useEffect(() => {
        if (windowDimensions) {
            // setDims(windowDimensions.width > windowDimensions.height)
            console.log('windowDimensions', windowDimensions)
            // console.log('dimensions:screen', Dimensions.get('screen'))
            // console.log('dimensions:window', Dimensions.get('window'))
            setDimensions(windowDimensions)
        }
    }, [windowDimensions])

    useEffect(() => {
        if (dimensions) {
            setLandscape(dimensions.width > dimensions.height)
            dispatch({ type: 'SET_DIMS', payload: dimensions })
        }
            
    }, [dimensions])
    
    const init = async () => {
            
        let storedValue = await getItem('dark')

        if (storedValue === 'true') toggleTheme()
        else setItem('dark', false)
        
        dispatch({ type: 'THEME_LOADED' })
    }
        
    const toggleTheme = async () => {
        const dark = !state.dark
        const payload = dark ? CombinedDarkTheme : CombinedLightTheme
        setItem('dark', dark)
        dispatch({ type: 'SET_THEME', payload })
    }

    const setTheme = async theme => {
        const payload = theme.dark ? CombinedDarkTheme : CombinedLightTheme
        setItem('dark', theme.dark)
        dispatch({ type: 'SET_THEME', payload })
    }

    const actions = useMemo(() => ({
        setTheme,
        toggleTheme,
    }), [state, dispatch])

    return (
        <ThemeContext.Provider
            value={{
                ...state,
                // dims,
                landscape,
                ...actions,
            }}
        >
            {state.themeLoaded && children}
        </ThemeContext.Provider>
    )
}

const reducer = (state, action) => {
    const { type, payload } = action
    switch(type) {
        case 'THEME_LOADED':
            return {
                ...state,
                themeLoaded: true,
            }
            break
        case 'SET_THEME':
            return {
                ...state,
                dark: payload.dark,
                theme: payload,
            }
            break
        case 'SET_DIMS':
            console.log('PAYLOAD', payload)
            const { height, width } = payload
            return {
                ...state,
                dims: { height, width },
            }
            break
        default: throw new Error()
    }
}
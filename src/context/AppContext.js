import React, { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useState } from 'react'
import {
    DarkTheme as NavigationDarkTheme,
    DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native'
import {
    MD2DarkTheme,
    MD2LightTheme,
    PaperProvider,
} from 'react-native-paper'
import { getItem, setItem } from '@utils/storage'
import { dark, light } from '@styles/colors'
import merge from 'deepmerge'
import { useWindowDimensions } from 'react-native'

const defaultTheme = merge(MD2LightTheme, NavigationDefaultTheme)
const darkTheme = merge(MD2DarkTheme, NavigationDarkTheme)

const CombinedDefaultTheme = merge(defaultTheme, light)
const CombinedDarkTheme = merge(darkTheme, dark)

const initialState = {
    loading: false,
    loaded: false,
    theme: CombinedDefaultTheme,
    isThemeDark: false,
    setLoading: () => {},
    toggleTheme: () => {},
    setDarkTheme: () => {},
}

export const AppContext = createContext(initialState)

export const useApp = () => {
    const context = useContext(AppContext)
    if (!context) {
        throw new Error()
    }
    return context
}

export const AppContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const dims = useWindowDimensions()

    const actions = useMemo(() => ({
        setLoading: async payload => {
            dispatch({ type: 'SET_LOADING', payload })
        },
        toggleTheme: () => {
            dispatch({ type: 'TOGGLE_THEME' })
        },
        setDarkTheme: payload => {
            dispatch({ type: 'SET_DARK_THEME', payload })
        },
    }), [state, dispatch])

    useEffect(() => {
        const initTheme = async () => {
            let dark = await getItem('dark')
            const isDark = dark === 'true'
            dispatch({
                type: 'SET_DARK_THEME',
                payload: isDark,
            })
        }
        initTheme()
    }, [])

    return (
        <PaperProvider theme={state.theme}>
            <AppContext.Provider
                value={{
                    ...state,
                    dims,
                    isLandscape: dims.width > dims.height,
                    ...actions,
                }}
            >
                {children}
            </AppContext.Provider>
        </PaperProvider>
    )
}

const reducer = (state, action) => {

    const { payload, type } = action
    switch(type) {
        case 'SET_LOADING':
            return {
                ...state,
                loading: payload,
            }
            break
        case 'SET_DARK_THEME':
            return {
                ...state,
                isThemeDark: payload,
                theme: payload
                    ? CombinedDarkTheme
                    : CombinedDefaultTheme,
            }
            break
        case 'TOGGLE_THEME':
            return {
                ...state,
                isThemeDark: !state.isThemeDark,
                theme: !state.isThemeDark
                    ? CombinedDarkTheme
                    : CombinedDefaultTheme,
            }
            break
        default:
            throw new Error()
    }
}
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
    MD2DarkTheme,
    MD2LightTheme,
    PaperProvider,
} from 'react-native-paper'
import { validateToken } from '@utils/auth'
import { getItem, storeToken, getStoredToken, setItem } from '@utils/storage'

import { dark, light } from '@styles/colors'
import merge from 'deepmerge'
import { useWindowDimensions } from 'react-native'

const defaultTheme = merge(MD2LightTheme, NavigationDefaultTheme)
const darkTheme = merge(MD2DarkTheme, NavigationDarkTheme)

const CombinedDefaultTheme = merge(defaultTheme, light)
const CombinedDarkTheme = merge(darkTheme, dark)

const initialState = {
    appLoaded: false,
    appLoading: false,
    dark: false,
    debug: false,
    theme: CombinedDefaultTheme,
    userId: null,
    reset: () => {},
    setAppLoading: () => {},
    signIn: () => {},
    signOut: () => {},
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
            
            let dark = await getItem('dark')
            if (dark === null) await setItem('dark', false)
            else {
                const isDark = dark === 'true'
                if (state.dark !== isDark) {
                    setItem('dark', isDark)
                    dispatch({ type: 'TOGGLE_THEME' })
                }
            }

            const authToken = await getStoredToken()
            let payload = null
            if (authToken !== null) {
                console.log('found token, verifying...')
                const user = await validateToken(authToken)
                if (user) {
                    console.log('token verified.', Object.keys(user))
                    payload = user._id
                }
            } else {
                console.log('no token found')
            }
            
            dispatch({ type: 'SET_APP_LOADED', payload })
        }
        init()
    }, [])

    const actions = useMemo(() => ({
        reset: () => {
            dispatch({ type: 'RESET' })
        },
        setApp: async payload => {
            dispatch({ type: 'SET_APP_LOADING', payload })
        },
        signIn: async payload => {
            await storeToken(payload.token)
            dispatch({ type: 'SIGN_IN', payload })
        },
        signOut: async () => {
            // await removeToken()
            // await cleanStorage()
            dispatch({ type: 'SIGN_OUT' })
        },
        toggleTheme: () => {
            setItem('dark', !state.dark)
            dispatch({ type: 'TOGGLE_THEME' })
        },
    }), [state, dispatch])

    return (
        <PaperProvider theme={state.theme}>
            <AppContext.Provider
                value={{
                    ...state,
                    dims,
                    landscape: dims.width > dims.height,
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
        case 'RESET':
            return {
                ...state,
                userId: null,
            }
            break
        case 'SET_APP_LOADED':
            return {
                ...state,
                appLoaded: true,
                userId: payload,
            }
            break
        case 'SET_APP_LOADING':
            return {
                ...state,
                appLoading: payload,
            }
            break
        case 'SIGN_IN':
            const { _id } = payload
            return {
                ...state,
                userId: _id,
                appModals: [],
            }
            break
        case 'SIGN_OUT':
            return {
                ...state,
                userId: null,
                appModals: [],
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
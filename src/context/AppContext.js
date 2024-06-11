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

import socket from '../socket'

const defaultTheme = merge(MD2LightTheme, NavigationDefaultTheme)
const darkTheme = merge(MD2DarkTheme, NavigationDarkTheme)

const CombinedDefaultTheme = merge(defaultTheme, light)
const CombinedDarkTheme = merge(darkTheme, dark)

const initialState = {
    appLoaded: false,
    appLoading: false,
    connections: [],
    userLoaded: false,
    userLoading: false,
    dark: false,
    debug: false,
    modals: [],
    profile: null,
    role: null,
    theme: CombinedDefaultTheme,
    userId: null,
    reset: () => {},
    setConnections: () => {},
    signIn: () => {},
    signOut: () => {},
    toggleTheme: () => {},
    clearUser: () => {},
    setUser: () => {},
    setAppLoading: () => {},
    setUserLoading: () => {},
    setUserLocation: () => {},
    setProfileImage: () => {},
    updateUser: () => {},
    updateImage: () => {},
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
            if (authToken) {
                console.log('found token, verifying...')
                const user = await validateToken(authToken)
                if (user) {
                    console.log('token verified.')
                    
                    dispatch({
                        type: 'SET_USER',
                        payload: {
                            ...user,
                            status: 'signed_in',
                        },
                    })
                }
            } else {
                console.log('no token found')
            }
            
            dispatch({ type: 'SET_APP_LOADED' })
        }
        
        init()
    }, [])

    const actions = useMemo(() => ({
        reset: () => {
            dispatch({ type: 'RESET' })
        },
        setAppLoading: async payload => {
            dispatch({ type: 'SET_APP_LOADING', payload })
        },
        setUserLoading: async payload => {
            dispatch({ type: 'SET_USER_LOADING', payload })
        },
        setConnections: payload => {
            dispatch({ type: 'SET_CONNECTIONS', payload })
        },
        setUser: payload => {
            dispatch({ type: 'SET_USER', payload })
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
        socket,
        toggleTheme: () => {
            setItem('dark', !state.dark)
            dispatch({ type: 'TOGGLE_THEME' })
        },
        updateUser: payload => {
            dispatch({ type: 'UPDATE_USER', payload })
        },
        setProfileImage: payload => {
            dispatch({ type: 'SET_PROFILE_IMAGE', payload })
        },
        setAppLoading: payload => {
            dispatch({ type: 'SET_APP_LOADING', payload })
        },
        setUserLocation: payload => {
            dispatch({ type: 'SET_USER_LOCATION', payload })
        },
        clearUser: () => {
            dispatch({ type: 'CLEAR_USER' })
        },
    }), [state, dispatch])

    return (
        <PaperProvider theme={state.theme}>
            <AppContext.Provider
                value={{
                    ...state,
                    dims,
                    landscape: dims.width > dims.height,
                    thin: dims.width < 400,
                    ...actions,
                }}
            >
                {state.appLoaded && children}
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
                role: null,
                profile: null,
            }
            break
        case 'SET_APP_LOADED':
            return {
                ...state,
                appLoaded: true,
            }
            break
        case 'SET_APP_LOADING':
            return {
                ...state,
                appLoading: payload,
            }
            break
        case 'SET_CONNECTIONS':
            return {
                ...state,
                connections: payload,
            }
            break
        case 'SET_USER_LOADED':
            return {
                ...state,
                userLoaded: true,
            }
            break
        case 'SET_USER_LOADING':
            return {
                ...state,
                userLoading: payload,
            }
            break
        case 'SET_USER':
            return {
                ...state,
                userId: payload._id,
                role: payload.role,
                profile: payload,
            }
            break
        case 'SIGN_IN':
            return {
                ...state,
                userId: payload._id,
                role: payload.role,
                profile: {
                    ...payload,
                    status: 'signed_in',
                },
            }
            break
        case 'SIGN_OUT':
            return {
                ...state,
                userId: null,
                role: null,
                profile: null,
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
        case 'UPDATE_USER':
            return {
                ...state,
                profile: {
                    ...state.profile,
                    ...payload,
                },
            }
            break
        case 'SET_PROFILE_IMAGE':
            return {
                ...state,
                profile: {
                    ...state.profile,
                    profileImage: payload,
                },
            }
            break
        case 'SET_USER_LOCATION':
            return {
                ...state,
                profile: {
                    ...state.profile,
                    location: payload,
                },
            }
            break
        case 'UPDATE_IMAGE':
            return {
                ...state,
                profile: {
                    ...state.profile,
                    images: state.profile.images
                        ? state.profile.images.map(
                            img => img._id === payload._id
                            ? payload
                            : img
                        ) : [payload],
                },
            }
            break
        case 'REMOVE_IMAGE':
            const profileImage = state.profile.profileImage && state.profile.profileImage._id === payload ? null : state.profileImage
            return {
                ...state,
                profile: {
                    ...state.profile,
                    images: state.profile.images.filter(
                        image => image._id !== payload
                    ),
                    profileImage,
                },
            }
            break
        case 'CLEAR_USER':
            return {
                ...state,
                profile: null,
            }
            break
        default:
            throw new Error()
    }
}
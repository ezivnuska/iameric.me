import React, { createContext, useContext, useEffect, useMemo, useReducer } from 'react'
import {
    clearStorage,
    getToken,
    removeToken,
    setToken,
} from '@utils/storage'

const initialState = {
    status: 'idle',
    authToken: null,
    error: null,
    authLoading: false,
    setAuthLoading: () => {},
    signIn: () => {},
    signOut: () => {},
}

export const AuthContext = createContext(initialState)

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error()
    }
    return context
}

export const AuthContextProvider = props => {

    const [state, dispatch ] = useReducer(reducer, initialState)
    
    useEffect(() => {
        const initState = async () => {
            try {
                // check for token in local storage
                const authToken = await getToken()
                // if token exists
                if (authToken !== null) {
                    // need to validate token, but for now...
                    // sign in
                    dispatch({ type: 'SIGN_IN', payload: authToken })
                } else {
                    console.log('no token found')
                }
            } catch (e) {
                console.log('Error:', e)
            }
        }
        initState()
    }, [])

    const actions = useMemo(() => ({
        setAuthLoading: async payload => {
            dispatch({ type: 'SET_AUTH_LOADING', payload })
        },
        signIn: async token => {
            dispatch({ type: 'SIGN_IN', payload: token })
            await setToken(token)
        },
        signOut: async () => {
            dispatch({ type: 'SIGN_OUT' })
            await removeToken()
            await clearStorage()
        },
    }), [state, dispatch])
    
    return (
        <AuthContext.Provider value={{ ...state, ...actions }}>
            {props.children}
        </AuthContext.Provider>
    )
}

const reducer = (state, action) => {
    const { payload, type } = action
    switch(type) {
        case 'SET_AUTH_LOADING':
            return {
                ...state,
                authLoading: payload,
            }
            break
        case 'SIGN_IN':
            return {
                ...state,
                status: 'in',
                authToken: payload,
            }
            break
        case 'SIGN_OUT':
            return {
                ...state,
                status: 'idle',
                authToken: null,
            }
            break
        default:
            throw new Error()
    }
}
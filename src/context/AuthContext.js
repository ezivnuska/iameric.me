import React, { createContext, useContext, useEffect, useMemo, useReducer } from 'react'
import {
    cleanStorage,
    getStoredToken,
    removeToken,
    storeToken,
} from '@utils/storage'
import { authenticate, validateToken } from '@utils/auth'
// import { navigationRef } from '@navigation/RootNavigation'

const initialState = {
    authLoading: false,
    authModal: null,
    authToken: null,
    authStatus: null,
    error: null,
    token: null,
    setAuthLoading: () => {},
    setAuthModal: () => {},
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
                const authToken = await getStoredToken()
                // if token exists
                if (authToken !== null) {
                    console.log('found token, verifying...')
                    // need to validate token, but for now...
                    // sign in
                    const payload = await validateToken(authToken)
                    if (payload) {
                        console.log('token verified.')
                        dispatch({ type: 'SIGN_IN', payload })
                    }
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
        setAuthModal: async payload => {
            dispatch({ type: 'SET_AUTH_MODAL', payload })
        },
        // setAuthStatus: async payload => {
        //     dispatch({ type: 'SET_AUTH_STATUS', payload })
        // },
        signIn: async payload => {
            await storeToken(payload.token)
            dispatch({ type: 'SIGN_IN', payload })
        },
        signOut: async () => {
            // await removeToken()
            // await cleanStorage()
            dispatch({ type: 'SIGN_OUT' })
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
        case 'SET_AUTH_MODAL':
            return {
                ...state,
                authModal: payload,
            }
            break
        case 'SET_AUTH_STATUS':
            return {
                ...state,
                authStatus: payload,
            }
            break
        case 'SIGN_IN':
            const { token, username } = payload
            return {
                ...state,
                authModal: null,
                authStatus: username,
                authToken: token,
            }
            break
        case 'SIGN_OUT':
            return {
                ...state,
                authModal: null,
                authStatus: null,
                authToken: null,
            }
            break
        default:
            throw new Error()
    }
}
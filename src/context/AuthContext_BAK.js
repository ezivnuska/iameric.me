import React, { createContext, useContext, useEffect, useMemo, useReducer } from 'react'
import {
    cleanStorage,
    getStoredToken,
    removeToken,
    storeToken,
} from '@utils/storage'
import { authenticate } from '@utils/auth'
// import { navigationRef } from '@navigation/RootNavigation'

const initialState = {
    status: 'out',
    authLoading: false,
    error: null,
    profile: null,
    userLoading: false,
    setAuthLoading: () => {},
    signIn: () => {},
    signOut: () => {},
    addImage: () => {},
    clearUser: () => {},
    removeImage: () => {},
    setUserLocation: () => {},
    setProfileImage: () => {},
    setUser: () => {},
    setUserLoading: () => {},
    updateImage: () => {},
    updateImages: () => {},
}

export const AuthContext = createContext(initialState)

// export const useAuth = () => {
//     const context = useContext(AuthContext)
//     if (!context) {
//         throw new Error()
//     }
//     return context
// }

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
                console.log('initializing auth context')
                // check for token in local storage
                const authToken = await getStoredToken()
                // if token exists
                if (authToken !== null) {
                    console.log('found token')
                    // need to validate token, but for now...
                    // sign in
                    console.log('verifying token')
                    const payload = await authenticate(authToken)
                    if (payload) {
                        console.log('user verified, dispatching signin event')
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
        signIn: async payload => {
            // await storeToken(payload.token)
            dispatch({ type: 'SIGN_IN', payload })
        },
        signOut: async () => {
            // await removeToken()
            // await cleanStorage()
            dispatch({ type: 'SIGN_OUT' })
        },
        setUser: payload => {
            dispatch({ type: 'SET_USER', payload })
        },
        setProfileImage: payload => {
            dispatch({ type: 'SET_PROFILE_IMAGE', payload })
        },
        setUserLoading: payload => {
            dispatch({ type: 'SET_USER_LOADING', payload })
        },
        setUserLocation: payload => {
            dispatch({ type: 'SET_USER_LOCATION', payload })
        },
        addImage: payload => {
            dispatch({ type: 'ADD_IMAGE', payload })
        },
        updateImage: payload => {
            dispatch({ type: 'UPDATE_IMAGE', payload })
        },
        updateImages: payload => {
            dispatch({ type: 'UPDATE_IMAGES', payload })
        },
        removeImage: payload => {
            dispatch({ type: 'REMOVE_IMAGE', payload })
        },
        clearUser: () => {
            dispatch({ type: 'CLEAR_USER' })
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
    console.log(type, payload)
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
                profile: payload,
                status: 'in',
            }
            break
        case 'SIGN_OUT':
            return {
                ...state,
                profile: null,
                status: 'out',
            }
            break
        case 'SET_USER_LOADING':
            return { ...state, userLoading: payload }
            break
        case 'SET_USER':
            return { ...state, profile: payload }
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
        case 'UPDATE_IMAGES':
            return {
                ...state,
                profile: {
                    ...state.profile,
                    images: payload,
                },
            }
            break
        case 'ADD_IMAGE':
            return {
                ...state,
                profile: {
                    ...state.profile,
                    images: [
                        ...state.profile.images,
                        payload,
                    ],
                },
            }
            break
        case 'UPDATE_IMAGE':
            return {
                ...state,
                profile: {
                    ...state.profile,
                    images: state.profile.images.map(
                        img => img._id === payload._id
                        ? payload
                        : img
                    ),
                },
            }
            break
        case 'REMOVE_IMAGE':
            return {
                ...state,
                profile: {
                    ...state.profile,
                    images: state.profile.images.filter(
                        image => image._id !== payload
                    ),
                },
            }
            break
        case 'UPDATE_PRODUCTS':
            if (!state.profile)
                return state

            return {
                ...state,
                profile: {
                    ...state.profile,
                    products: action.products,
                },
            }
            break
        case 'REMOVE_PRODUCT':
            const productIndex = state.profile.products.findIndex(p => p._id === action.productId)

            if (productIndex > -1) {
                return {
                    ...state,
                    profile: {
                        ...state.profile,
                        products: [
                            ...state.products.slice(0, productIndex),
                            ...state.products.slice(productIndex + 1),
                        ],
                    },
                }
            } else {
                return {
                    ...state,
                    profile: {
                        ...state.profile,
                        products: [],
                    },
                }
            }
            break
        case 'CLEAR_USER':
            console.log('clearing user data...')
            return {
                ...state,
                profile: null,
            }
            break
        default:
            throw new Error()
    }
}
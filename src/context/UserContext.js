import React, { createContext, useContext, useMemo, useReducer } from 'react'

const initialState = {
    profile: null,
    loading: false,
    loaded: false,
    error: null,
    setUser: () => {},
    setProfileImage: () => {},
    setLocation: () => {},
    updateImages: () => {},
    updateImage: () => {},
    addImage: () => {},
    removeImage: () => {},
    clearUser: () => {},
}

export const UserContext = createContext(initialState)

export const useUser = () => {
    const context = useContext(UserContext)
    if (!context) {
        throw new Error()
    }
    return context
}

export const UserContextProvider = props => {
    
    const [state, dispatch] = useReducer(reducer, initialState)

    const actions = useMemo(() => ({
        setUser: payload => {
            dispatch({ type: 'SET_USER', payload })
        },
        setProfileImage: payload => {
            dispatch({ type: 'SET_PROFILE_IMAGE', payload })
        },
        setLocation: payload => {
            dispatch({ type: 'SET_LOCATION', payload })
        },
        updateImages: payload => {
            dispatch({ type: 'UPDATE_IMAGES', payload })
        },
        addImage: payload => {
            dispatch({ type: 'ADD_IMAGE', payload })
        },
        updateImage: payload => {
            dispatch({ type: 'UPDATE_IMAGE', payload })
        },
        removeImage: payload => {
            dispatch({ type: 'REMOVE_IMAGE', payload })
        },
        clearUser: () => {
            dispatch({ type: 'CLEAR_USER' })
        },
    }), [state, dispatch])

    return (
        <UserContext.Provider value={{ ...state, ...actions }}>
            {props.children}
        </UserContext.Provider>
    )
}

const reducer = (state, action) => {
    const { type, payload } = action
    switch(type) {
        case 'SET_LOADING':
            return { ...state, loading: payload }
            break
        case 'SET__LOADED':
            return { ...state, loaded: payload }
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
        case 'SET_LOCATION':
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
                        ...state.images,
                        payload,
                    ],
                },
            }
            break
        case 'UPDATE_IMAGE':
            if (!state.profile.images) {
                return {
                    ...state,
                    profile: {
                        ...state.profile,
                        images: [payload],
                    }
                }
            }
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
import React, { createContext, useContext, useMemo, useReducer } from 'react'

const initialState = {
    profile: null,
    userLoading: false,
    error: null,
    addImage: () => {},
    clearUser: () => {},
    removeImage: () => {},
    setLocation: () => {},
    setProfileImage: () => {},
    setUser: () => {},
    setUserLoading: () => {},
    updateImage: () => {},
    updateImages: () => {},
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
        setUserLoading: payload => {
            dispatch({ type: 'SET_USER_LOADING', payload })
        },
        setLocation: payload => {
            dispatch({ type: 'SET_LOCATION', payload })
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
        <UserContext.Provider value={{ ...state, ...actions }}>
            {props.children}
        </UserContext.Provider>
    )
}

const reducer = (state, action) => {
    const { type, payload } = action
    switch(type) {
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
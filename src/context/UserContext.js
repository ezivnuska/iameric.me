import React, { createContext, useContext, useEffect, useMemo, useReducer } from 'react'
import { loadUser } from '@utils/user'
import { useApp } from '@context'

const initialState = {
    uploading: false,
    profile: null,
    userLoaded: false,
    userLoading: false,
    userModals: [],
    error: null,
    addImage: () => {},
    clearUser: () => {},
    closeUserModal: () => {},
    removeImage: () => {},
    setUploading: () => {},
    setUser: () => {},
    setUserLoading: () => {},
    setUserLocation: () => {},
    setUserModal: () => {},
    setProfileImage: () => {},
    updateImage: () => {},
    updateImages: () => {},
}

export const UserContext = createContext(initialState)

export const useUser = () => {
    const context = useContext(UserContext)
    if (!context) throw new Error()
    return context
}

export const UserContextProvider = props => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const { userId } = useApp()

    useEffect(() => {
        const init = async () => {
            if (userId) {
                console.log('user authorized. loading user...')
                dispatch({ type: 'SET_USER_LOADING', payload: true })
                const data = await loadUser(userId)
                dispatch({ type: 'SET_USER_LOADING', payload: false })
                if (!data) console.log('could not load user')
                else dispatch({ type: 'SET_USER', payload: data })
            } else console.log('user not verified.')
            
            dispatch({ type: 'SET_USER_LOADED' })
        }
        
        init()

    }, [userId])

    const actions = useMemo(() => ({
        closeUserModal: async () => {
            dispatch({ type: 'CLOSE_USER_MODAL' })
        },
        setUploading: payload => {
            dispatch({ type: 'SET_UPLOADING', payload })
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
        setUserModal: async (type, data) => {
            dispatch({
                type: 'SET_USER_MODAL',
                payload: { data, type },
            })
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
            {state.userLoaded && props.children}
        </UserContext.Provider>
    )
}

const reducer = (state, action) => {
    const { type, payload } = action
    switch(type) {
        case 'SET_USER_LOADED':
            return {
                ...state,
                userLoaded: true,
            }
            break
        case 'SET_UPLOADING':
            return { ...state, uploading: payload }
            break
        case 'SET_USER_LOADING':
            return { ...state, userLoading: payload }
            break
        case 'SET_USER_MODAL':
            if (!payload) return state
            return {
                ...state,
                userModals: [
                    ...state.userModals,
                    payload,
                ],
            }
            break
        case 'CLOSE_USER_MODAL':
            return {
                ...state,
                userModals: state.userModals.slice(0, state.userModals.length - 1),
            }
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
                    images: state.profile.images ? [
                        ...state.profile.images,
                        payload,
                    ] : [payload],
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
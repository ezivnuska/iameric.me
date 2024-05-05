import React, { createContext, useContext, useEffect, useMemo, useReducer } from 'react'
import { loadUser } from '@utils/user'
import { useApp } from '@context'

const initialState = {
    profile: null,
    userLoaded: false,
    userLoading: false,
    userModals: [],
    error: null,
    clearUser: () => {},
    setUser: () => {},
    setUserLoading: () => {},
    setUserLocation: () => {},
    setProfileImage: () => {},
    updateUser: () => {},
    updateImage: () => {},
}

export const UserContext = createContext(initialState)

export const useUser = () => {
    const context = useContext(UserContext)
    if (!context) throw new Error()
    return context
}

export const UserContextProvider = props => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const { appLoaded, userId } = useApp()

    useEffect(() => {
        
        const init = async () => {
            if (userId) {
                console.log('user authorized. loading user...')
                dispatch({ type: 'SET_USER_LOADING', payload: true })
                const data = await loadUser(userId)
                dispatch({ type: 'SET_USER_LOADING', payload: false })
                if (!data) console.log('could not load user')
                else {
                    console.log('user verified.')
                    dispatch({ type: 'SET_USER', payload: data })
                }
            } else console.log('user not verified.')
            
            dispatch({ type: 'SET_USER_LOADED' })
        }
        
        if (appLoaded) init()

    }, [userId])

    const actions = useMemo(() => ({
        setUser: payload => {
            dispatch({ type: 'SET_USER', payload })
        },
        updateUser: payload => {
            dispatch({ type: 'UPDATE_USER', payload })
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
        case 'SET_USER_LOADING':
            return { ...state, userLoading: payload }
            break
        case 'SET_USER':
            return { ...state, profile: payload }
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
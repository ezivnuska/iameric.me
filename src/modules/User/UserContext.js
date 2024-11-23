import React, {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useReducer,
} from 'react'
import { getItem, getStoredToken, setItem } from '@utils/storage'
import { validateToken } from '@utils/auth'

const initialState = {
    userModals: [],
    user: null,
    userLoaded: false,
    userLoading: false,
    closeUserModal: () => {},
    setUser: () => {},
    setUserModal: () => {},
    setProfileImage: () => {},
    setUserLoading: () => {},
    updateUser: () => {},
}

export const UserContext = createContext(initialState)

export const useUser = () => {
    const context = useContext(UserContext)
    if (!context) throw new Error()
    return context
}

export const UserContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, initialState)

    const init = async () => {

        const token = await getStoredToken()
        
        if (token) {
            console.log('found token')
            // WE DON'T NEED TO VALIDATE TOKEN, YET
            // FOR NOW WE'RE JUST FAKING IT

            // dispatch({ type: 'SET_TOKEN', payload})
            const user = await validateToken(token)
            console.log('token user', user)
            
            if (user) {
                dispatch({ type: 'SET_USER', payload: user })
            } else {
                console.log('validation failed')
            }

            // SO FOR NOW...
            // dispatch({ type: 'SET_TOKEN', payload: true })
        } else {
            console.log('no token found')
            // dispatch({ type: 'SET_TOKEN', payload: false })
        }
        
        dispatch({ type: 'USER_LOADED' })
        console.log('USER LOADED')
    }

    useEffect(() => {
        init()
    }, [])

    const reset = () => {
        dispatch({ type: 'RESET' })
    }

    const setUser = payload => {
        console.log('setting user', payload)
        dispatch({ type: 'SET_USER', payload })
    }

    const closeUserModal = () => {
        dispatch({ type: 'CLOSE_USER_MODAL' })
    }

    const setUserLoading = payload => {
        dispatch({ type: 'SET_USER_LOADING', payload })
    }

    const setUserModal = (type, data) => {
        dispatch({ type: 'SET_USER_MODAL', payload: { type, data } })
    }
    
    const setProfileImage = payload => {
        dispatch({ type: 'SET_PROFILE_IMAGE', payload })
    }
    
    const updateUser = payload => {
        dispatch({ type: 'UPDATE_USER', payload })
        
        // used only for dev purposes
        const keys = Object.keys(payload)
        // addNotification(`User ${keys.toString()} updated`)
    }

    const actions = useMemo(() => ({
        closeUserModal,
        setUserModal,
        reset,
        setProfileImage,
        setUserLoading,
        setUser,
        updateUser,
    }), [state, dispatch])

    return (
        <UserContext.Provider
            value={{
                ...state,
                userModal: state.userModals[state.userModals.length - 1],
                ...actions,
            }}
        >
            {state.userLoaded && children}
        </UserContext.Provider>
    )
}

const reducer = (state, action) => {
    const { payload, type } = action
    // console.log(`${type}${payload ? `: ${payload}` : ``}`)
    switch(type) {
        case 'RESET': return { ...state, user: null }; break
        case 'USER_LOADED': return { ...state, userLoaded: true }; break
        case 'SET_PROFILE_IMAGE':
            return {
                ...state,
                user: {
                    ...state.user,
                    profileImage: payload,
                },
            }
            break
        case 'SET_TOKEN': return { ...state, token: payload }; break
        case 'SET_USER': return { ...state, user: payload }; break
        case 'SET_USER_LOADING':
            return {
                ...state,
                userLoading: payload,
            }
            break
        case 'CLOSE_USER_MODAL':
            return {
                ...state,
                userModals:  state.userModals.slice(0, state.userModals.length - 1),
            }
            break
        case 'SET_USER_MODAL':
            return {
                ...state,
                userModals: [
                    ...state.userModals,
                    payload,
                ],
            }
            break
        case 'UPDATE_USER':
            return {
                ...state,
                user: {
                    ...state.user,
                    payload,
                },
            }
            break
        default: throw new Error()
    }
}
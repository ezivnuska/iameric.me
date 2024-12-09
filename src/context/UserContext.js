import React, {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useReducer,
} from 'react'
import { getItem, getStoredToken, setItem } from '@utils/storage'
import { validateToken } from '@utils/auth'
import { loadImages } from '@utils/images'

const initialState = {
    userModals: [],
    user: null,
    userLoaded: false,
    userLoading: false,
    
    // merged from images context
    images: [],
    error: null,
    imagesLoaded: false,
    imagesLoading: false,
    uploading: false,

    closeUserModal: () => {},
    clearUserModals: () => {},
    setUser: () => {},
    setUserModal: () => {},
    setProfileImage: () => {},
    setUserLoading: () => {},
    updateUser: () => {},

    // merged from images context
    addImage: () => {},
    clearImages: () => {},
    removeImage: () => {},
    setImages: () => {},
    setImagesLoading: () => {},
    setUploading: () => {},
    updateImage: () => {},
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
            // console.log('found token')
            // WE DON'T NEED TO VALIDATE TOKEN, YET
            // FOR NOW WE'RE JUST FAKING IT

            // dispatch({ type: 'SET_TOKEN', payload})
            const user = await validateToken(token)
            
            
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
    }

    useEffect(() => {
        init()
    }, [])

    const initImages = async userId => {

        dispatch({type: 'SET_IMAGES_LOADING', payload: true })
        const items = await loadImages(userId)
        dispatch({type: 'SET_IMAGES_LOADING', payload: false })

        dispatch({type: 'SET_IMAGES', payload: items })

        dispatch({type: 'SET_IMAGES_LOADED' })
    }

    const reset = () => {
        dispatch({ type: 'RESET' })
    }

    const setUser = payload => {
        dispatch({ type: 'SET_USER', payload })
    }

    const clearUserModals = () => {
        dispatch({ type: 'CLEAR_USER_MODALS' })
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
        // const keys = Object.keys(payload)
        // addNotification(`User ${keys.toString()} updated`)
    }

    const actions = useMemo(() => ({
        initImages,
        clearUserModals,
        closeUserModal,
        setUserModal,
        reset,
        setProfileImage,
        setUserLoading,
        setUser,
        updateUser,
        addImage: payload => {
            dispatch({ type: 'ADD_IMAGE', payload })
        },
        clearImages: () => {
            dispatch({ type: 'RESET' })
        },
        removeImage: payload => {
            dispatch({ type: 'REMOVE_IMAGE', payload })
        },
        setImages: payload => {
            dispatch({ type: 'SET_IMAGES', payload })
            if (!state.imagesLoaded) dispatch({ type: 'SET_IMAGES_LOADED' })
        },
        setImagesLoading: payload => {
            dispatch({ type: 'SET_IMAGES_LOADING', payload })
        },
        setUploading: payload => {
            dispatch({ type: 'SET_UPLOADING', payload })
        },
        updateImage: payload => {
            dispatch({ type: 'UPDATE_IMAGE', payload })
        },
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
        case 'CLEAR_USER_MODALS':
            return {
                ...state,
                userModals:  [],
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
                    ...payload,
                },
            }
            break
        // merged from images context
        case 'SET_IMAGES_LOADING':
            return {
                ...state,
                imagesLoading: payload,
            }
            break
        case 'SET_IMAGES_LOADED':
            return {
                ...state,
                imagesLoaded: true,
            }
            break
        case 'REMOVE_IMAGE':
            const images = state.images.filter(image => image._id !== payload)
            return {
                ...state,
                images,
            }
            break
        case 'SET_IMAGES':
            return {
                ...state,
                images: payload,
            }
            break
        case 'ADD_IMAGE':
            return {
                ...state,
                images: [ ...state.images, payload ],
            }
            break
        case 'SET_UPLOADING':
            return { ...state, uploading: payload }
            break
        case 'RESET':
            return {
                ...state,
                images: [],
                imagesLoaded: false,
            }
            break
        case 'UPDATE_IMAGE':
            return {
                ...state,
                images: state.images.map(image => image._id === payload._id ? payload : image),
            }
            break
        default: throw new Error()
    }
}
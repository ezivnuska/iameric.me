import React, {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useReducer,
} from 'react'
import { getItem, getStoredToken, setItem } from '@utils/storage'
import { validateToken } from '@utils/auth'
import { loadContact, loadContacts } from '@utils/contacts'
import { loadImages } from '@utils/images'

const initialState = {
    user: null,
    userDetails: null,
    users: [],
    userLoaded: false,
    userLoading: false,
    usersLoaded: false,
    usersLoading: false,
    userDetailsLoading: false,

    addUser: () => {},
    removeUser: () => {},
    setUserDetails: () => {},
    setUserDetailsLoading: () => {},
    setUsers: () => {},
    setUsersLoaded: () => {},
    setUsersLoading: () => {},
    
    // merged from images context
    images: [],
    error: null,
    imagesLoaded: false,
    imagesLoading: false,
    uploading: false,

    setUser: () => {},
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

    useEffect(() => {
        init()
    }, [])

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

    const initUsers = async () => {
        
        dispatch({ type: 'SET_USERS_LOADING', payload: true })
        const users = await loadContacts()
        dispatch({ type: 'SET_USERS_LOADING', payload: false })
        
        if (!users) console.log('could not load users')
        else dispatch({ type: 'SET_USERS', payload: users })
        
        dispatch({ type: 'SET_USERS_LOADED' })
    }

    const initUserDetails = async username => {

        dispatch({ type: 'SET_USER_DETAILS_LOADING', payload: true })
        const user = await loadContact(username, true)
        dispatch({ type: 'SET_USER_DETAILS_LOADING', payload: false })
        
        if (!user) console.log('could not load user details')
        else {
            dispatch({ type: 'SET_USER_DETAILS', payload: user })
            dispatch({ type: 'UPDATE_USER', payload: user })
        }
        // dispatch({ type: 'SET_USER_DETAILS_LOADED' })
        // dispatch({ type: 'SET_CONTACT_IMAGES_LOADED' })
    }

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

    const setUserDetails = payload => {
        dispatch({ type: 'SET_USER_DETAILS', payload })
    }
    const setUserLoading = payload => {
        dispatch({ type: 'SET_USER_LOADING', payload })
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
        initUsers,
        initUserDetails,
        reset,
        setProfileImage,
        setUserDetails,
        setUserLoading,
        setUser,
        updateUser,
        addImage: payload => {
            dispatch({ type: 'ADD_IMAGE', payload })
        },
        clearImages: () => {
            dispatch({ type: 'RESET' })
        },
        removeImage: (userId, imageId) => {
            dispatch({ type: 'REMOVE_IMAGE', payload: { userId, imageId } })
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
                ...actions,
            }}
        >
            {state.userLoaded && children}
        </UserContext.Provider>
    )
}

const reducer = (state, action) => {
    const { payload, type } = action
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
        case 'SET_USER':
            return {
                ...state,
                user: payload,
                users: [payload],
            }
            break
        case 'SET_USERS':
            return {
                ...state,
                users: payload,
            }
            break
        case 'SET_USER_DETAILS':
            return {
                ...state,
                userDetails: payload,
            }
            break
        case 'SET_USER_LOADING':
            return {
                ...state,
                userLoading: payload,
            }
            break
        case 'SET_USERS_LOADED':
            return {
                ...state,
                usersLoaded: payload,
            }
            break
        case 'SET_USERS_LOADING':
            return {
                ...state,
                usersLoading: payload,
            }
            break
        case 'SET_USER_DETAILS_LOADING':
            return {
                ...state,
                userDetailsLoading: payload,
            }
            break
        case 'UPDATE_USER':
            return {
                ...state,
                users: state.users.map(user => {
                    if (user._id === payload._id) {
                        return { ...user, ...payload }
                    }
                    return user
                }),
                user: state.user._id === payload._id ? {
                    ...state.user,
                    ...payload,
                } : state.user,
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
            const { userId, imageId } = payload
            const updatedUsers = users.map((user, index) => {
                if (user._id === userId) {
                    return {
                        ...user,
                        images: user.images.filter(img => img._id !== imageId),
                    }
                } else return user
            })
            // const images = state.images.filter(image => image._id !== payload)
            return {
                ...state,
                user: state.user._id === userId ? {
                    ...state.user,
                    images: state.user.images.filter(img => img._id !== imageId),
                } : state.user,
                users: updatedUsers,
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
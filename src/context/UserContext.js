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
import { loadImage, loadImages } from '@utils/images'
import merge from 'deepmerge'

const initialState = {
    user: null,
    users: [],
    userLoaded: false,
    userLoading: false,
    usersLoaded: false,
    usersLoading: false,
    userDetailsLoading: false,

    getUserProfileImage: () => {},
    findUserByUsername: () => {},
    addUser: () => {},
    removeUser: () => {},
    setUsers: () => {},
    setUsersLoaded: () => {},
    setUsersLoading: () => {},
    
    images: [],
    error: null,
    imageLoading: false,
    imagesLoading: false,
    uploading: false,

    setUser: () => {},
    setProfileImage: () => {},
    setUserLoading: () => {},
    updateUser: () => {},

    addImage: () => {},
    clearImages: () => {},
    fetchUserAndUpdate: () => {},
    fetchImageAndUpdate: () => {},
    fetchImagesAndUpdate: () => {},
    findUserById: () => {},
    findUserImage: () => {},
    removeImage: () => {},
    setImages: () => {},
    setImageLoading: () => {},
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

    const fetchUserAndUpdate = async username => {
        
        dispatch({ type: 'SET_USER_DETAILS_LOADING', payload: true })
        const user = await loadContact(username)
        dispatch({ type: 'SET_USER_DETAILS_LOADING', payload: false })
        
        if (user) dispatch({ type: 'UPDATE_USER', payload: user })
        else console.log('could not fetch user details')

        return user
    }

    const fetchImageAndUpdate = async imageId => {

        dispatch({ type: 'SET_IMAGE_LOADING', payload: true })
        const payload = await loadImage(imageId)
        dispatch({ type: 'SET_IMAGE_LOADING', payload: false })

        if (payload) dispatch({ type: 'UPDATE_IMAGE', payload })
        else console.log('could not load image')
        
        return payload
    }

    const fetchImagesAndUpdate = async userId => {

        let images = null
        
        dispatch({type: 'SET_IMAGES_LOADING', payload: true })
        images = await loadImages(userId)
        dispatch({type: 'SET_IMAGES_LOADING', payload: false })
        
        if (images) {
            dispatch({type: 'SET_IMAGES', payload: { userId, images } })
        }

        return images
    }

    const reset = () => {
        dispatch({ type: 'RESET' })
    }

    const setUser = payload => {
        dispatch({ type: 'SET_USER', payload })
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

    const getUserImages = id => state.images.filter(img => img.user._id === id)
    const findUserById = userId => state.users.filter(user => user._id === userId)[0]
    const findUserImageById = (id, images) => images.filter(img => img._id === id)[0]
    const findUserImage = (userId, imageId) => {
        const userWithId = findUserById(userId)
        if (userWithId && userWithId.images?.length) {
            const imageWithId = findUserImageById(imageId, userWithId.images)
            return imageWithId
        }
        return null
    }

    const actions = useMemo(() => ({
        getUserImages,
        findUserByUsername: username => state.users.filter(user => user.username === username)[0],
        findUserById,
        fetchImageAndUpdate,
        fetchImagesAndUpdate,
        fetchUserAndUpdate,
        findUserImage,
        reset,
        setProfileImage,
        setUserLoading,
        setUser,
        updateUser,
        getUserProfileImage: id => {
            const { profileImage } = state.users.filter(user => user._id === id)[0]
            return profileImage
        },
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
        },
        setImageLoading: payload => {
            dispatch({ type: 'SET_IMAGE_LOADING', payload })
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
    
    let updatedUsers
    
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
            const savedUser = state.users.filter(user => user._id === payload._id)[0]
            
            const users = savedUser
                ? state.users.map(user => user._id === payload._id ? merge(user, payload) : user)
                : [ ...state.users, payload ]
            
            return {
                ...state,
                users,
                user: state.user._id === payload._id ? merge(state.user, payload) : state.user,
            }
            break
        case 'SET_IMAGE_LOADING':
            return {
                ...state,
                imageLoading: payload,
            }
            break
        case 'SET_IMAGES_LOADING':
            return {
                ...state,
                imagesLoading: payload,
            }
            break
        case 'REMOVE_IMAGE':
            const { userId, imageId } = payload

            updatedUsers = state.users.map((user, index) => {
                if (user._id === userId) {
                    return {
                        ...user,
                        images: user.images.filter(img => img._id !== imageId),
                    }
                } else return user
            })

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
                users: state.users.map(user => {
                    if (user._id === payload.userId) {
                        return {
                            ...user,
                            images: payload.images,
                        }
                    }
                    return user
                }),
                user: payload.userId === state.user._id ? {
                    ...state.user,
                    images: payload.images,
                } : state.user,
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
            }
            break
        case 'UPDATE_IMAGE':
            let updatedUser = null
            updatedUsers = state.users.map(item => {
                if (item._id === payload.user._id) {
                    
                    let images = null
                    if (!item.images) images = [payload]
                    else {
                        let index = null
                        images = item.images.map((image, i) => {
                            if (image._id === payload._id) {
                                index = i
                                return payload
                            }
                            return image
                        })

                        if (!index) images = [ ...images, payload ]
                    }
                    
                    updatedUser = {
                        ...item,
                        images,
                    }
                    
                    return updatedUser
                }
                return item
            })
            
            return {
                ...state,
                users: updatedUsers,
                user: updatedUser._id === state.user._id ? updatedUser : state.user,
            }
            break
        default: throw new Error()
    }
}
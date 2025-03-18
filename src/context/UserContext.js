import React, {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useReducer,
} from 'react'
import { getItem, getStoredToken, setItem, storeToken } from '@utils/storage'
import { signin, validateToken } from '@utils/auth'
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

    getUser: () => {},
    getProfile: () => {},
    getProfileImage: () => {},
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

    setUser: () => {},
    setProfileImage: () => {},
    setUserLoading: () => {},
    updateUser: () => {},

    addImage: () => {},
    completeUpload: () => {},
    clearImages: () => {},
    getUserImages: () => {},
    fetchUserAndUpdate: () => {},
    fetchImageAndUpdate: () => {},
    fetchImagesAndUpdate: () => {},
    findUserById: () => {},
    findUserImage: () => {},
    removeImage: () => {},
    setImages: () => {},
    setImageLoading: () => {},
    setImagesLoading: () => {},
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

            const user = await validateToken(token)
            
            
            if (user) {
                dispatch({ type: 'SET_USER', payload: user })
            } else {
                console.log('validation failed')
            }

        } else {
            console.log('no token found')
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

    const reset = () => {
        dispatch({ type: 'RESET' })
    }

    const setUser = payload => {
        dispatch({ type: 'SET_USER', payload })
    }

    const setUserLoading = payload => {
        dispatch({ type: 'SET_USER_LOADING', payload })
    }

    const setProfileImage = profileImage => {
        const payload = {
            ...state.user,
            profileImage,
        }
        dispatch({ type: 'UPDATE_USER', payload })
        // dispatch({ type: 'SET_PROFILE_IMAGE', payload })
    }
    
    const updateUser = payload => {
        dispatch({ type: 'UPDATE_USER', payload })
        
        // used only for dev purposes
        // const keys = Object.keys(payload)
        // addNotification(`User ${keys.toString()} updated`)
    }

    const setDeletedImage = payload => {
        dispatch({ type: 'SET_DELETED_IMAGE', payload })
    }

    const setUploadedImage = payload => {
        dispatch({ type: 'SET_UPLOADED_IMAGE', payload })
    }

    const setImageUpload = payload => {
        dispatch({ type: 'SET_IMAGE_UPLOAD', payload })
    }

    const getUserImages = userId => {
        const userWithId = findUserById(userId)
        if (userWithId && userWithId.images?.length) {
            return userWithId.images
        }
        return []
    }

    const getUser = (id = null) => {
        const userId = id || state.user._id
        const user = state.users.filter(user => user._id === userId)[0]
        return user
    }

    const getProfileImage = (id = null) => {
        const userId = id || state.user._id
        const user = state.users.filter(user => user._id === userId)[0]
        return user.profileImage
    }


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

    const getProfile = profileId => state.users.filter(user => user._id === profileId)[0]

    const actions = useMemo(() => ({
        getUser,
        getProfileImage,
        getProfile,
        getUserImages,
        findUserByUsername: username => state.users.filter(user => user.username === username)[0],
        findUserById,
        fetchImageAndUpdate,
        fetchUserAndUpdate,
        findUserImage,
        reset,
        setDeletedImage,
        setProfileImage,
        setUserLoading,
        setUser,
        updateUser,
        setUploadedImage,
        setImageUpload,
        getUserProfileImage: id => {
            const user = state.users.filter(user => user._id === id)[0]
            return user?.profileImage
        },
        addImage: (userId, image) => {
            dispatch({ type: 'ADD_IMAGE', payload: { userId, image } })
        },
        clearImages: () => {
            dispatch({ type: 'RESET' })
        },
        completeUpload: (userId, image) => {
            dispatch({ type: 'COMPLETE_UPLOAD', payload: { userId, image } })
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

    const iam = useMemo(() => state.users.filter(user => user._id === state.user._id)[0], [state.users])

    return (
        <UserContext.Provider
            value={{
                ...state,
                authUser: state.user && state.users.filter(user => user._id === state.user._id)[0],
                iam,
                ...actions,
            }}
        >
            {state.userLoaded && children}
        </UserContext.Provider>
    )
}

const reducer = (state, action) => {
    
    const { payload, type } = action
    // console.log(type, payload)
    
    let updatedUser
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
                ? state.users.map(user => user._id === payload._id ? {...user, ...payload} : user)
                : [ ...state.users, payload ]
            
            return {
                ...state,
                users,
                user: state.user._id === payload._id ? {...state.user, ...payload} : state.user,
            }
            break
        case 'SET_IMAGE_LOADING':
            return {
                ...state,
                imageLoading: payload,
            }
            break
        case 'SET_IMAGE_UPLOAD':
            return {
                ...state,
                imageUpload: payload,
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

                    updatedUser = {
                        ...user,
                        images: user.images.filter(img => img._id !== imageId),
                    }

                    return updatedUser
                } else {

                    return user
                }
            })

            return {
                ...state,
                user: state.user._id === userId ? updatedUser : state.user,
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
            updatedUsers = state.users.map((user, index) => {
                if (user._id === payload.userId) {

                    updatedUser = {
                        ...user,
                        images: [...user.images, payload.image],
                    }

                    return updatedUser
                } else {

                    return user
                }
            })

            return {
                ...state,
                user: state.user._id === payload.userId ? updatedUser : state.user,
                users: updatedUsers,
            }
            // break
            // return {
            //     ...state,
            //     images: [ ...state.images, payload ],
            // }
            break
        case 'COMPLETE_UPLOAD':
            updatedUsers = state.users.map((user, index) => {
                if (user._id === payload.userId) {

                    updatedUser = {
                        ...user,
                        images: user.images.map(image => {
                            if (image.uri) {
                                return payload.image
                            } else {
                                return image
                            }
                        }),
                    }

                    return updatedUser
                } else {

                    return user
                }
            })

            return {
                ...state,
                user: state.user._id === payload.userId ? updatedUser : state.user,
                users: updatedUsers,
            }
            break
        case 'SET_UPLOADING':
            return { ...state, uploading: payload }
            break
        case 'SET_UPLOADED_IMAGE':
            return { ...state, uploadedImage: payload }
            break
        case 'SET_DELETED_IMAGE':
            return { ...state, deletedImage: payload }
            break
        case 'RESET':
            return {
                ...state,
                images: [],
            }
            break
        case 'UPDATE_IMAGE':
            updatedUsers = state.users.map(item => {
                if (item._id === payload.user._id) {
                    
                    let images = null
                    if (!item.images) images = [payload]
                    else {
                        let updated = false
                        images = item.images.map((image, i) => {
                            if (image === payload._id || image._id === payload._id) {
                                updated = true
                                return payload
                            }
                            return image
                        })

                        if (!updated) images = [ ...images, payload ]
                    }
                    
                    updatedUser = {
                        ...item,
                        images,
                        profileImage: item.profileImage && item.profileImage._id === payload._id ? {
                            ...item.profileImage,
                            user: {
                                _id: payload.user._id,
                                username: payload.user.username,
                            },
                        } : item.profileImage,
                    }
                    
                    return updatedUser
                }
                return item
            })
            // console.log('updatedUsers', updatedUsers)
            // // const user = state.user.profileImage && updatedUser?._id === state.user._id ? updatedUser : state.user
            // console.log('updatedUser', updatedUser)
            return {
                ...state,
                users: updatedUsers,
                user: state.user.profileImage && updatedUser?._id === state.user._id ? updatedUser : state.user,
            }
            break
        default: throw new Error()
    }
}
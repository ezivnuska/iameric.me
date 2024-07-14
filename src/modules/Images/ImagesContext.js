import React, { createContext, useContext, useEffect, useMemo, useReducer } from 'react'
import { useApp } from '@app'
import { loadImages } from '@utils/images'

const initialState = {
    images: [],
    error: null,
    imagesLoaded: false,
    imagesLoading: false,
    uploading: false,
    addImage: () => {},
    clearImages: () => {},
    getImage: () => {},
    removeImage: () => {},
    setImages: () => {},
    setImagesLoading: () => {},
    setUploading: () => {},
    updateImage: () => {},
}

export const ImagesContext = createContext(initialState)

export const useImages = () => {
    const context = useContext(ImagesContext)
    if (!context) {
        throw new Error()
    }
    return context
}

export const ImagesContextProvider = props => {
    
    const { user } = useApp()
    const [state, dispatch] = useReducer(reducer, initialState)
    
    useEffect(() => {
        const initImages = async () => {
            dispatch({type: 'SET_IMAGES_LOADING', payload: true })
            const items = await loadImages(user._id)
            dispatch({type: 'SET_IMAGES_LOADING', payload: false })
            dispatch({type: 'SET_IMAGES', payload: items })

            dispatch({type: 'SET_IMAGES_LOADED' })
        }
        
        if (user) initImages()
        
    }, [user])

    const actions = useMemo(() => ({
        addImage: payload => {
            dispatch({ type: 'ADD_IMAGE', payload })
        },
        clearImages: () => {
            dispatch({ type: 'RESET' })
        },
        getImage: imageId => state.images.map(image => image._id === imageId)[0] || null,
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
        <ImagesContext.Provider value={{ ...state, ...actions }}>
            {props.children}
        </ImagesContext.Provider>
    )
}

const reducer = (state, action) => {
    const { type, payload } = action
    switch(type) {
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
        default:
            throw new Error()
    }
}
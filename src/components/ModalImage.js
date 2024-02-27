import React, { useContext, useEffect } from 'react'
import {
    ImageDetail,
} from '.'
import { AppContext } from '../AppContext'
import axios from 'axios'

export default () => {

    const {
        dispatch,
        image,
        products,
        user,
    } = useContext(AppContext)

    const isImageProfileImage = id => user.profileImage === id

    const isImageProductImage = id => {
        let response = false
        products.map(product => {
            if (product.image === id || product.image._id === id) response = product
        })
        return response
    }

    const deleteImage = async () => {

        dispatch({ type: 'REMOVE_IMAGE', id: image._id })

        const isProfileImage = isImageProfileImage(image._id)
        const isProductImage = user.role === 'vendor' ? isImageProductImage(image._id) : null
        
        dispatch({ type: 'SET_LOADING', loading: 'Deleting Image...' })

        const { data } = await axios
            .post('/api/images/delete', {
                imageId: image._id,
                isProductImage,
                isProfileImage,
            })
            
        if (!data) {
            console.log('Error deleting image.')
        } else {
            // if (onDelete) onDelete(data.imageId, isProfileImage, isProductImage)
            dispatch({ type: 'CLOSE_MODAL' })
            dispatch({ type: 'SET_IMAGE', image: null })
        }

        dispatch({ type: 'SET_LOADING', loading: null })
        
    }

    const setAvatar = async () => {
        
        dispatch({ type: 'SET_LOADING', loading: 'Setting Avatar...' })

        const { data } = await axios
            .post('/api/user/avatar', {
                userId: user._id,
                imageId: image._id,
            })
        
        if (!data) {
            console.log('Error setting profileImage.')
        } else {
            dispatch({ type: 'SET_PROFILE_IMAGE', profileImage: data })
            dispatch({ type: 'CLOSE_MODAL' })
            dispatch({ type: 'SET_IMAGE', image: null })
        }
        
        dispatch({ type: 'SET_LOADING', loading: null })
    }

    const setProductImage = async productId => {
        
        dispatch({ type: 'SET_LOADING', loading: 'Setting product image...' })

        const { data } = await axios
            .post('/api/product/image', {
                productId,
                imageId: image._id,
            })

        if (!data) {
            console.log('Error setting image id for product.')
        } else if (!data.image) {
            console.log('no image found')
        } else {
            dispatch({ type: 'UPDATE_PRODUCT_IMAGE', productId, image: data.image })
        }
        
        dispatch({ type: 'CLOSE_MODAL' })
        dispatch({ type: 'SET_LOADING', loading: null })
    }
    
    return image ? (
        <ImageDetail
            image={image}
            deleteImage={deleteImage}
            setAvatar={setAvatar}
            setProductImage={setProductImage}
        />
    ) : null
}
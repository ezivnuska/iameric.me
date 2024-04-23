import React, { useEffect } from 'react'
import {
    ImageDetail,
    LoadingView,
} from '.'
import {
    useContacts,
    useModal,
    useProducts,
    useAuth,
} from '@context'
import axios from 'axios'
import { loadUserImage } from '@utils/images'

export default () => {
    const { profile, removeImage, setProfileImage } = useAuth()
    const { closeModal, data } = useModal()
    const { removeUserImage } = useContacts()
    const { items, updateProductImage } = useProducts()
    
    useEffect(() => {
        const init = async () => {
            const loadedImage = await loadUserImage(data._id)
            if (!loadedImage) return console.log('problem loading user image.')
        }
        init()
    }, [])

    const isImageProfileImage = id => profile.profileImage === id

    const isImageProductImage = id => {
        let response = false
        items.map(product => {
            if (product.image === id || product.image._id === id) response = product
        })
        return response
    }

    const deleteImage = async () => {
        if (data.user._id === profile._id) {
            removeImage(data._id)
        } else {
            removeUserImage(data)
        }

        const isProfileImage = isImageProfileImage(data._id)
        const isProductImage = profile.role === 'vendor' ? isImageProductImage(data._id) : null

        const response = await axios
            .post('/api/images/delete', {
                imageId: data._id,
                isProductImage,
                isProfileImage,
            })
            
        if (!response.data) {
            console.log('Error deleting image.')
        }
        
        closeModal()
    }

    const setAvatar = async () => {

        const response = await axios
            .post('/api/user/avatar', {
                userId: profile._id,
                imageId: data._id,
            })
        
        if (!response.data) {
            console.log('Error setting profileImage.')
        } else {
            setProfileImage(response.data)
        }

        closeModal()
    }

    const setProductImage = async productId => {

        const response = await axios
            .post('/api/product/image', {
                productId,
                imageId: data._id,
            })

        if (!response.data) {
            console.log('Error setting image id for product.')
        } else if (!response.data.image) {
            console.log('no image found')
        } else {
            updateProductImage(productId, response.data.image)
        }
        
        closeModal()
    }
    
    return data && (
        <ImageDetail
            image={data}
            deleteImage={deleteImage}
            setAvatar={setAvatar}
            setProductImage={setProductImage}
        />
    )
}
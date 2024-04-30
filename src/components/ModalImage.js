import React, { useEffect } from 'react'
import {
    ImageDetail,
} from '.'
import {
    useContacts,
    useModal,
    useProducts,
    useUser,
} from '@context'
import axios from 'axios'
import { loadUserImage } from '@utils/images'

export default ({ image }) => {
    const { removeUserImage } = useContacts()
    const { closeModal } = useModal()
    const { items, updateProductImage } = useProducts()
    const { profile, removeImage, setProfileImage } = useUser()
    
    useEffect(() => {
        const init = async () => {
            const loadedImage = await loadUserImage(image._id)
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
        if (image.user._id === profile._id) removeImage(image._id)
        else removeUserImage(image)

        const isProfileImage = isImageProfileImage(image._id)
        const isProductImage = profile.role === 'vendor' ? isImageProductImage(image._id) : null

        const response = await axios
            .post('/api/images/delete', {
                imageId: image._id,
                isProductImage,
                isProfileImage,
            })
            
        if (!response.data) console.log('Error deleting image.')
        
        closeModal()
    }

    const setAvatar = async () => {

        const response = await axios
            .post('/api/user/avatar', {
                userId: profile._id,
                imageId: image._id,
            })
        
        if (!response.data) console.log('Error setting profileImage.')
        else setProfileImage(response.data)

        closeModal()
    }

    const setProductImage = async productId => {

        const response = await axios
            .post('/api/product/image', {
                productId,
                imageId: image._id,
            })

        if (!response.data) console.log('Error setting image id for product.')
        else if (!response.data.image) console.log('no image found')
        else updateProductImage(productId, response.data.image)
        
        closeModal()
    }
    
    return image && (
        <ImageDetail
            image={image}
            deleteImage={deleteImage}
            setAvatar={setAvatar}
            setProductImage={setProductImage}
        />
    )
}
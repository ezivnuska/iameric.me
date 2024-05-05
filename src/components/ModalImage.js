import React, { useEffect } from 'react'
import {
    CenterVertical,
    ImageDetail,
} from '@components'
import {
    useApp,
    useImages,
    useModal,
    useProducts,
    useUser,
} from '@context'
import axios from 'axios'
import { loadUserImage } from '@utils/images'

export default ({ image }) => {
    const {
        removeImage,
    } = useImages()
    const { closeModal } = useModal()
    const { products, updateProduct, updateProductImage } = useProducts()
    const {
        profile,
        setProfileImage,
    } = useUser()
    
    useEffect(() => {
        const init = async () => {
            const loadedImage = await loadUserImage(image._id)
            if (!loadedImage) return console.log('problem loading user image.')
        }
        init()
    }, [])

    const isImageProfileImage = imageId => {
        if (!profile || !profile.profileImage) return false
        else if (profile.profileImage._id === imageId) return true
        return false
    }

    const isImageProductImage = imageId => {
        let response = null
        products.map(product => {
            if (product.image && (product.image === imageId || product.image._id === imageId)) response = product._id
        })
        return response
    }

    const deleteImage = async () => {

        const isProfileImage = isImageProfileImage(image._id)
        const isProductImage = isImageProductImage(image._id)

        const { data } = await axios.post('/api/images/delete', {
            imageId: image._id,
            isProductImage,
            isProfileImage,
        })
        
        if (!data || !data.deletedImage) console.log('Error deleting image.')
        else {
            if (isProductImage) updateProductImage(isProductImage, null)
            if (isProfileImage) setProfileImage(null)
            removeImage(data.deletedImage._id)
        }
        
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

        const { data } = await axios.post('/api/product/image', {
            productId,
            imageId: image._id,
        })
        
        if (!data) console.log('Error setting image id for product.')
        else if (!data.image) console.log('no image found')
        else updateProduct(data)
        
        closeModal()
    }
    
    return image && (
        <CenterVertical>
            <ImageDetail
                image={image}
                deleteImage={() => deleteImage(image._id)}
                setAvatar={setAvatar}
                setProductImage={setProductImage}
            />
        </CenterVertical>
    )
}
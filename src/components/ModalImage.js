import React, { useEffect } from 'react'
import {
    ImageDetail,
} from '.'
import {
    useApp,
    useContacts,
    useModal,
    useProducts,
    useUser,
} from '@context'
import axios from 'axios'
import { loadUserImage } from '@utils/images'
import { loadUser } from '@utils/user'

export default ({ image }) => {
    const { userId, setUserLoading } = useApp()
    const { removeUserImage } = useContacts()
    const { closeModal } = useModal()
    const { items, updateProductImage } = useProducts()
    const { profile, removeImage, setProfileImage, setUser } = useUser()
    
    useEffect(() => {
        const init = async () => {
            if (!profile) {
                console.log('* warning * no profile found in ModalImage')
                setUserLoading(true)
                const loadedUser = await loadUser(userId)
                setUserLoading(false)
                if (loadedUser) setUser(loadedUser)
            }
            const loadedImage = await loadUserImage(image._id)
            if (!loadedImage) return console.log('problem loading user image.')
        }
        init()
    }, [])

    const isImageProfileImage = id => {
        if (!profile || !profile.profileImage) return false
        if (profile.profileImage._id === id) return true
        return false
    }

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

        const { data } = await axios
            .post('/api/images/delete', {
                imageId: image._id,
                isProductImage,
                isProfileImage,
            })
        
        if (!data) console.log('Error deleting image.')
        else if (isProfileImage) removeImage(data.imageId)
        
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
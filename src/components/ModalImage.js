import React, { useContext, useEffect, useState } from 'react'
import {
    ImageDetail,
    LoadingView,
} from '.'
import {
    AppContext,
    useContacts,
    useModal,
    useProducts,
    useUser,
} from '@context'
import axios from 'axios'
import { loadUnknownImage } from '@utils/images'

export default ({ id }) => {
    const { profile, removeImage, setProfileImage } = useUser()
    const { closeModal, data } = useModal()
    const { removeUserImage } = useContacts()
    const { items, updateProductImage } = useProducts()

    const [image, setImage] = useState(null)
    
    useEffect(() => {
        const init = async () => {
            const loadedImage = await loadUnknownImage(data._id, profile._id)
            if (!loadedImage) return console.log('problem loading unknow image.')
            setImage(loadedImage)
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
        if (feature.user._id === profile._id) {
            console.log('removing image', image)
            removeImage(image._id)
        } else {
            console.log('removing user image', image)
            removeUserImage(image)
        }

        const isProfileImage = isImageProfileImage(image._id)
        const isProductImage = profile.role === 'vendor' ? isImageProductImage(image._id) : null

        const { data } = await axios
            .post('/api/images/delete', {
                imageId: image._id,
                isProductImage,
                isProfileImage,
            })
            
        if (data) {
            console.log('Error deleting image.')
        }
        
        closeModal()
    }

    const setAvatar = async () => {

        const { data } = await axios
            .post('/api/user/avatar', {
                userId: user._id,
                imageId: image._id,
            })
        
        if (!data) {
            console.log('Error setting profileImage.')
        } else {
            setProfileImage(data)
        }

        closeModal()
    }

    const setProductImage = async productId => {

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
            updateProductImage(productId, data.image)
        }
        
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
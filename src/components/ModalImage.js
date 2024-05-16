import React, { useEffect } from 'react'
import {
    CenterVertical,
    ImageDetail,
} from '@components'
import {
    useImages,
    useModal,
    useProducts,
    useUser,
} from '@context'
import {
    deleteImage,
    loadUserImage,
    setImageAsAvatar,
} from '@utils/images'
import {
    addImageToProduct,
} from '@utils/products'

export default ({ image }) => {
    const {
        imagesLoading,
        removeImage,
        setImagesLoading,
    } = useImages()
    const { closeModal } = useModal()
    const {
        products,
        setProductsLoading,
        updateProduct,
        updateProductImage,
    } = useProducts()
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

    const onImageDeleted = async () => {

        const isProfileImage = isImageProfileImage(image._id)
        const isProductImage = isImageProductImage(image._id)

        const deletedImage = await deleteImage(image._id, isProductImage, isProfileImage)
        
        if (!deletedImage) console.log('Error deleting image.')
        else {
            if (isProductImage) updateProductImage(isProductImage, null)
            if (isProfileImage) setProfileImage(null)
            removeImage(deletedImage._id)
        }
        
        closeModal()
    }

    const setAvatar = async () => {

        setImagesLoading(true)
        const avatar = await setImageAsAvatar(image._id, profile._id)
        setImagesLoading(false)
        
        if (avatar) setProfileImage(avatar)

        closeModal()
    }

    const setProductImage = async (imageId, productId) => {

        setProductsLoading(true)
        const product = await addImageToProduct(imageId, productId)
        setProductsLoading(false)
        
        if (product) updateProduct(product)
        
        closeModal()
    }
    
    return image && (
        <CenterVertical>
            <ImageDetail
                image={image}
                deleteImage={onImageDeleted}
                setAvatar={setAvatar}
                setProductImage={setProductImage}
            />
        </CenterVertical>
    )
}
import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import {
    IconButton,
    ImageSized,
    ProductSelector,
    ThemedText,
} from '@components'
import {
    useApp,
    useImages,
    useModal,
    useProducts,
    useUser,
} from '@context'
import {
    deleteImage,
    getMaxImageDims,
    loadUserImage,
    setImageAsAvatar,
} from '@utils/images'
import {
    addImageToProduct,
} from '@utils/products'
import { classes } from '@styles'

export default ({ image }) => {
    const { dims, landscape, theme } = useApp()
    const {
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
        userLoading,
    } = useUser()

    const [imageDims, setImageDims] = useState(null)

    useEffect(() => {
        setImageDims(getMaxImageDims(image.width, image.height, dims))
    }, [dims])

    const allowDeletion = () => (
        profile.username !== 'Driver' &&
        profile.username !== 'Customer' &&
        profile.username !== 'Vendor' &&
        profile.role === 'admin'
    )

    const disableDelete = () => userLoading || process.env.NODE_ENV === 'development'
    const isAvatar = () => (profile.profileImage && profile.profileImage._id === image._id)
    const isOwner = () => profile._id === image.user._id
    
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

    const handleDelete = () => {
        if (disableDelete()) alert(`Can't delete in development`)
        else onImageDeleted()
    }
    
    return image && (
        <View style={classes.centerV}>
            <View
                style={{
                    flexDirection: landscape ? 'row' : 'column',
                    justifyContent: landscape ? 'center' : 'flex-start',
                    alignItems: 'flex-start',
                    gap: 10,
                    width: '100%',
                    alignItems: 'center',
                }}
            >
                <View
                    style={{
                        flexBasis: 'auto',
                        flexGrow: 0,
                    }}
                >
                    {imageDims && <ImageSized image={image} dims={imageDims} />}
                </View>
                <View
                    style={{
                        flexBasis: 'auto',
                        flexGrow: 0,
                        marginVertical: 20,
                    }}
                >

                    {isOwner() && (
                        <View
                            style={{
                                flexBasis: 'auto',
                                flexGrow: landscape ? 0 : 0,
                            }}
                        >
                            <View
                                style={{
                                    flexDirection: landscape ? 'column' : 'row',
                                    justifyContent: landscape ? 'stretch' : 'space-evenly',
                                    width: '100%',
                                    gap: 10,
                                    // paddingHorizontal: 'auto',
                                    // marginBottom: 10,
                                }}
                            >
                                
                                {(isOwner() && !isAvatar()) && (
                                    <IconButton
                                        type='primary'
                                        label='Set as Avatar'
                                        onPress={setAvatar}
                                        disabled={userLoading}
                                        style={{
                                            color: theme?.colors.textDefault,
                                        }}
                                    />
                                )}

                                {allowDeletion() && (
                                    <IconButton
                                        type='danger'
                                        label='Delete'
                                        onPress={handleDelete}
                                        // disabled={disableDelete()}
                                        style={{
                                            flex: 1,
                                            opacity: disableDelete() ? 0.5 : 1,
                                        }}
                                    />
                                )}

                            </View>

                            {(isOwner() && products.length) && (
                                <View
                                    style={{
                                        flex: 1,
                                        width: '100%',
                                    }}
                                >
                                    <ThemedText bold>
                                        Set as Product Image
                                    </ThemedText>

                                    <ProductSelector
                                        onSelect={productId => setProductImage(image._id, productId)}
                                        products={products}
                                        imageId={image._id}
                                    />
                                </View>
                            )}
                        </View>
                    )}
                </View>
            </View>
        </View>
    )
}
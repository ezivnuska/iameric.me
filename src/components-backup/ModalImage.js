import React, { useEffect, useMemo, useState } from 'react'
import {
    Pressable,
    View,
} from 'react-native'
import {
    IconButton,
    ImageSized,
    ThemedText,
} from '@components'
import {
    useApp,
    useImages,
    useModal,
    useProducts,
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

const ProductOptions = ({ list, onSelect }) => (
    <View
        style={{
            flex: 1,
            flexGrow: 1,
            // width: '100%',
            // borderWidth: 1,
            // borderColor: 'orange',
        }}
    >
        <View
            style={{
                marginVertical: 10,
                flexBasis: 'auto',
                // borderWidth: 1,
                // borderColor: 'green',
            }}
        >
            {list.map((product, index) => (
                <Pressable
                    key={`product-option-${index}`}
                    onPress={() => onSelect(product._id)}
                >
                    <ThemedText>{product.title}</ThemedText>
                </Pressable>
            ))}
        </View>
    </View>
)

export default ({ image }) => {
    const {
        dims,
        landscape,
        theme,
        profile,
        setProfileImage,
        appLoading,
    } = useApp()
    const {
        removeImage,
        setImagesLoading,
    } = useImages()
    const {
        clearModal,
        closeModal,
        setModal,
    } = useModal()
    const {
        products,
        setProductsLoading,
        updateProduct,
        updateProductImage,
    } = useProducts()

    const [imageDims, setImageDims] = useState(null)
    const [productsVisible, setProductsVisible] = useState(false)

    const availableProducts = useMemo(() => products.filter(item => (!item.image || item.image._id !== image._id)), [products, image])

    useEffect(() => {
        setImageDims(getMaxImageDims(image.width, image.height, dims))
    }, [dims])

    const allowDelete = () => (
        profile._id === image.user ||
        profile.role === 'admin' ||
        appLoading ||
        process.env.NODE_ENV === 'development'
    )

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

        setImagesLoading(true)
        const deletedImage = await deleteImage(image._id, isProductImage, isProfileImage)
        setImagesLoading(false)
        
        if (!deletedImage) console.log('Error deleting image.')
        else {
            if (isProductImage) updateProductImage(isProductImage, null)
            if (isProfileImage) setProfileImage(null)
            removeImage(deletedImage._id)
        }
        
        clearModal()
    }

    const setAvatar = async () => {

        setImagesLoading(true)
        const avatar = await setImageAsAvatar(image._id, profile._id)
        setImagesLoading(false)
        
        if (avatar) setProfileImage(avatar)

        closeModal()
    }

    const setProductImage = async (imageId, productId) => {

        setProductsVisible(false)

        setProductsLoading(true)
        const product = await addImageToProduct(imageId, productId)
        setProductsLoading(false)
        
        if (product) updateProduct(product)
        
        closeModal()
    }

    const handleDelete = () => {
        if (!allowDelete()) alert(`Can't delete in development`)
        else setModal('IMAGE_DELETE', onImageDeleted)
        // else onImageDeleted()
    }
    
    return image && (
        <View style={[classes.centerV, classes.paddingH]}>
            <View
                style={{
                    width: '100%',
                }}
            >
                {imageDims && <ImageSized image={image} dims={imageDims} />}
                <View
                    style={{
                        marginVertical: 20,
                        width: '100%',
                    }}
                >

                    {isOwner() && (
                        <View>
                            <View
                                style={{
                                    flex: 1,
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    width: '100%',
                                    gap: 10,
                                    flexGrow: 0,
                                }}
                            >
                                
                                {!isAvatar() ? (
                                    <IconButton
                                        type='primary'
                                        label='Set as Avatar'
                                        onPress={setAvatar}
                                        disabled={appLoading}
                                        style={{
                                            flex: 1,
                                            color: theme?.colors.textDefault,
                                        }}
                                    />
                                ) : null}

                                {availableProducts.length ? (
                                    <IconButton
                                        label='Add to Product'
                                        onPress={() => setProductsVisible(!productsVisible)}
                                        style={{
                                            flex: 1,
                                            flexGrow: 1,
                                            color: theme?.colors.textDefault,
                                        }}
                                    />
                                ) : null}

                                {allowDelete() ? (
                                    <IconButton
                                        type='danger'
                                        onPress={handleDelete}
                                        style={{
                                            flexBasis: 'auto',
                                            flexShrink: 1,
                                            opacity: allowDelete() ? 1 : 0.5,
                                        }}
                                    />
                                ) : null}

                            </View>

                            {productsVisible && (
                                <ProductOptions
                                    list={availableProducts}
                                    onSelect={productId => setProductImage(image._id, productId)}
                                />
                            )}
                        </View>
                    )}
                </View>
            </View>
        </View>
    )
}
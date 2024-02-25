import React, { useContext, useEffect, useState } from 'react'
import {
    Image,
    Pressable,
    Text,
    useWindowDimensions,
    View,
} from 'react-native'
import {
    IconButton,
    ProductSelector,
} from '.'
import { AppContext } from '../AppContext'
import axios from 'axios'
import layout from '@styles/layout'
import { useTheme } from 'react-native-paper'
import { getOrientation } from '@utils/metrics'
import { loadProducts } from '@utils/data'

const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'

export default ({ onDelete = null }) => {

    const theme = useTheme()
    const dims = useWindowDimensions()

    const {
        dispatch,
        image,
        loading,
        products,
        user,
    } = useContext(AppContext)

    const [orientation, setOrientation] = useState('portrait')

    useEffect(() => {
        if (dims) {
            const newOrientation = getOrientation(dims)
            if (newOrientation !== orientation) setOrientation(newOrientation)
        }
    }, [dims])

    useEffect(() => {
        if (!products) fetchProducts(user._id)
    }, [products])

    const fetchProducts = async id => {

        dispatch({ type: 'SET_LOADING', loading: 'Loading products...' })
        const updatedProducts = await loadProducts(id)
        dispatch({ type: 'SET_PRODUCTS', products: updatedProducts })
        dispatch({ type: 'SET_LOADING', loading: null })
    }

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

        let isProductImage = null
        if (user.role === 'vendor') {
            isProductImage = isImageProductImage(image._id)
        }
        
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
            if (onDelete) onDelete(data.imageId, isProfileImage, isProductImage)
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
        
        dispatch({ type: 'SET_LOADING', loading: null })
        
        if (!data) {
            console.log('Error setting profileImage.')
            return
        }
        
        dispatch({ type: 'SET_PROFILE_IMAGE', profileImage: data })

        dispatch({ type: 'CLOSE_MODAL' })
    }

    const setProductImage = async productId => {
        
        dispatch({ type: 'SET_LOADING', loading: 'Setting product image...' })

        const { data } = await axios
            .post('/api/product/image', {
                productId,
                imageId: image._id,
            })

        dispatch({ type: 'SET_LOADING', loading: null })
        
        if (!data) {
            console.log('Error setting image id for product.')
        } else if (!data.image) {
            console.log('no image found')
        } else {
            dispatch({ type: 'UPDATE_PRODUCT_IMAGE', productId, image: data.image })
        }

        dispatch({ type: 'CLOSE_MODAL' })
    }

    return (image && user) ? (
        <Pressable
            onPress={() => dispatch({ type: 'CLOSE_MODAL' })}
            style={{
                justifyContent: 'flex-start',
                width: '100%',
                alignItems: 'center',
                paddingTop: 100,
                paddingBottom: 200,
            }}
        >
            <View
                style={{
                    flexBasis: 'auto',
                    flexGrow: 1,
                }}
            >
                <Image
                    // width={width}
                    // height={height}
                    source={{
                        uri: `${IMAGE_PATH}/${image.user.username}/${image.filename}`,
                    }}
                    style={{
                        resizeMode: 'contain',
                        maxHeight: '95%',
                        maxWidth: '95%',
                        height: image.height,
                        width: image.width,
                        borderWidth: 1,
                        marginHorizontal: 'auto',
                    }}
                />
            </View>

            {(user._id === image.user._id) ? (
                <View
                    style={{
                        flexBasis: 'auto',
                        // flexShrink: 1,
                        // flexGrow: 1,
                        marginHorizontal: 'auto',
                        // borderWidth: 1,
                        // borderColor: 'red',
                    }}
                >
                    <View
                        style={{
                            flex: 1,
                            display: 'flex',
                            flexDirection: orientation === 'portrait' ? 'row' : 'column',
                            justifyContent: 'space-evenly',
                            width: '100%',
                            // height: 50,
                            // marginVertical: layout.verticalPadding,
                            paddingHorizontal: layout.horizontalPadding,
                        }}
                    >
                        
                        {(!user.profileImage || (user.profileImage && user.profileImage._id !== image._id)) ? (
                            <IconButton
                                type='primary'
                                label='Set as Avatar'
                                onPress={setAvatar}
                                disabled={loading}
                                style={{
                                    // flex: 1,
                                    color: theme?.colors.textDefault,
                                }}
                            />
                        ) : null}

                        {user.username !== 'Driver' &&
                        user.username !== 'Customer' &&
                        user.username !== 'Vendor' && (
                            <IconButton
                                type='danger'
                                label='Delete Image'
                                onPress={deleteImage}
                                disabled={loading}
                                style={{
                                    flex: 1,
                                }}
                            />
                        )}

                    </View>

                    {(user.role === 'vendor' &&
                    (products && products.length)) ? (
                        <View style={{
                            flex: 1,
                            width: '100%',
                        }}>
                            <Text
                                style={{
                                    color: '#fff',
                                    marginVertical: 7,
                                }}
                            >
                                Make product image:
                            </Text>
                            
                            <View>
                                <ProductSelector
                                    onSelect={setProductImage}
                                    products={products}
                                    imageId={image._id}
                                />
                            </View>
                        </View>
                    ) : null}
                </View>
            ) : null}
        </Pressable>
    ) : null
}
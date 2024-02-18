import React, { useContext, useEffect, useState } from 'react'
import {
    Image,
    Text,
    View,
} from 'react-native'
import {
    IconButton,
    ProductSelector,
} from '.'
import { AppContext } from '../AppContext'
import axios from 'axios'
import layout from '../styles/layout'
import { useTheme } from 'react-native-paper'

const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'

export default ({ imageData, onDelete = null, resize = 'stretch' }) => {

    const theme = useTheme()

    const {
        dispatch,
        user,
        products,
    } = useContext(AppContext)

    const [loading, setLoading] = useState(null)

    // useEffect(() => {
    //     console.log('imageData', imageData)
    // }, [imageData])

    const isImageProfileImage = id => user.profileImage === id

    const isImageProductImage = id => {
        let response = false
        products.map(product => {
            if (!product.image) return false
            if (product.image === id || product.image._id === id) response = product
        })
        return response
    }

    const deleteImage = async () => {

        const imageId = imageData._id

        dispatch({ type: 'REMOVE_IMAGE', id: imageId })

        const isProfileImage = isImageProfileImage(imageId)

        let isProductImage = null
        if (user.role === 'vendor') {
            isProductImage = isImageProductImage(imageId)
        }
        
        setLoading('Deleting Image...')

        const { data } = await axios
            .post('/api/images/delete', {
                imageId,
                isProductImage,
                isProfileImage,
            })

        setLoading(null)
        
        if (!data) {
            console.log('Error deleting image.')
            return null
        }
        
        setLoading(null)
        
        if (onDelete) onDelete(data.imageId, isProfileImage, isProductImage)
    }

    const setAvatar = async () => {
        
        setLoading('Setting Avatar...')

        const { data } = await axios
            .post('/api/user/avatar', {
                userId: user._id,
                imageId: imageData._id,
            })
        
        if (!data) {
            console.log('Error setting profileImage.')
            setLoading(null)
            return
        }
        
        setLoading(null)
        
        dispatch({ type: 'SET_PROFILE_IMAGE', profileImage: data })

        dispatch({ type: 'CLOSE_MODAL' })
    }

    const setProductImage = async productId => {
        
        setLoading(true)
        
        // setShowProductSelector(false)

        const { data } = await axios
            .post('/api/product/image', {
                productId,
                imageId: imageData._id,
            })

        setLoading(null)
        
        if (!data) {
            console.log('Error setting image id for product.')
            return null
        }

        dispatch({ type: 'UPDATE_PRODUCT_IMAGE', productId, image: data.image })
        
        dispatch({ type: 'CLOSE_MODAL' })
    }

    return imageData ? (
        <View
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'center',
            }}
        >
            <Image
                // width={width}
                // height={height}
                source={{
                    uri: `${IMAGE_PATH}/${imageData.user.username}/${imageData.filename}`,
                }}
                style={{
                    resizeMode: 'contain',
                    width: imageData.width,
                    height: imageData.height,
                    borderWidth: 1,
                    // marginBottom: 15,
                }}
            />

            {(user._id === imageData.user._id) ? (
                <>
                    <View
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-evenly',
                            width: '100%',
                            height: 50,
                            paddingVertical: layout.verticalPadding,
                            borderWidth: 1,
                            borderColor: 'red',
                        }}
                    >
                        
                        {/* {(!user.profileImage || (user.profileImage && user.profileImage._id !== imageData._id)) ? ( */}
                            <IconButton
                                type='primary'
                                label='Set as Avatar'
                                onPress={setAvatar}
                                disabled={loading}
                                style={{ flex: 1, color: theme?.colors.textDefault }}
                            />
                        {/* ) : null} */}

                        {/* {user.username !== 'Driver' &&
                        user.username !== 'Customer' &&
                        user.username !== 'Vendor' && ( */}
                            <IconButton
                                type='danger'
                                label='Delete Image'
                                onPress={deleteImage}
                                disabled={loading}
                                style={{ flex: 1 }}
                            />
                        {/* )} */}

                    </View>

                    {(user.role === 'vendor' &&
                    (products && products.length)) ? (
                        <View style={{ 
                            width: '100%',
                            // borderWidth: 1,
                            // borderColor: 'yellow',
                            // backgroundColor: 'orange',
                        }}>
                            <Text
                                style={{
                                    color: '#fff',
                                    marginVertical: 7,
                                }}
                            >
                                Make product image:
                            </Text>
                            
                            <ProductSelector
                                onSelect={setProductImage}
                                products={products}
                                imageId={imageData._id}
                            />
                        </View>
                    ) : null}
                </>
            ) : null}
        </View>
    ) : null
}
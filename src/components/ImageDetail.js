import React, { useContext, useEffect, useState } from 'react'
import {
    Image,
    Text,
    View,
} from 'react-native'
import { ProductSelector } from '.'
import { AppContext } from '../AppContext'
import { Button } from 'antd'
import axios from 'axios'
import layout from '../styles/layout'
import main from '../styles/main'

const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'

export default ({ closeModal, onDelete, imageData, resize = 'stretch' }) => {

    const {
        dispatch,
        user,
        products,
    } = useContext(AppContext)

    const [loading, setLoading] = useState(null)
    // const [showProductSelector, setShowProductSelector] = useState(false)

    const isImageProfileImage = id => user.profileImage === id

    const isImageProductImage = id => {
        let response = false
        products.map(product => {
            if (!product.image) return false
            if (product.image === id || product.image._id === id) response = true
        })
        return response
    }

    useEffect(() => {
        console.log('imageData', imageData)
    }, [imageData])

    const deleteImage = async () => {

        const imageId = imageData._id

        dispatch({ type: 'REMOVE_IMAGE', id: imageId })

        const isProfileImage = isImageProfileImage(imageId)

        let isProductImage = null
        if (user.role === 'vendor') {
            isProductImage = isImageProductImage(imageId, products)
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
        
        onDelete(data.imageId, isProfileImage, isProductImage)
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

        closeModal()
    }

    const showAvatarButton = () => {
        if (!user.profileImage || user.profileImage._id !== imageData._id) return true
        return false
    }

    const setProductImage = async productId => {
        
        setLoading(true)
        
        // setShowProductSelector(false)

        const { data } = await axios
            .post('/api/product/image', {
                productId,
                imageId: imageData._id,
            })

        setLoading(false)
        
        if (!data) {
            console.log('Error setting image id for product.')
            return null
        }

        dispatch({ type: 'UPDATE_PRODUCT_IMAGE', productId, image: data.image })
        
        closeModal()
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
                    uri: `${IMAGE_PATH}/${user.username}/${imageData.filename}`,
                }}
                style={{
                    resizeMode: 'contain',
                    width: imageData.width,
                    height: imageData.height,
                    borderWidth: 1,
                    marginBottom: 15,
                }}
            />

            <View
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    width: '100%',
                    paddingVertical: layout.verticalPadding,
                }}
            >
                {showAvatarButton() && (
                    <Button
                        onClick={setAvatar}
                        disabled={loading}
                    >
                        Make Avatar
                    </Button>
                )}

                <Button
                    onClick={deleteImage}
                    disabled={loading}
                >
                    Delete
                </Button>

            </View>

            {imageData &&
            user.role === 'vendor' &&
            (products && products.length) && (
                <View>
                    <Text style={{ color: '#fff' }}>Make product image:</Text>
                    
                    <ProductSelector
                        onSelect={setProductImage}
                        products={products}
                        imageId={imageData._id}
                    />
                </View>
            )}

        </View>
    ) : null
}
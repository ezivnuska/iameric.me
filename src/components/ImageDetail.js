import React, { useContext, useEffect, useState } from 'react'
import {
    Image,
    View,
} from 'react-native'
import { LoadingView } from '.'
import { AppContext } from '../AppContext'
import { Button } from 'antd'
import axios from 'axios'
import layout from '../styles/layout'
import { getImageDataById } from '../Data'

const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'

export default ({ closeModal, onDelete, image, width = 200, height = 200, resize = 'stretch' }) => {

    const {
        dispatch,
        user,
    } = useContext(AppContext)

    const [loading, setLoading] = useState(null)
    const [imageData, setImageData] = useState(null)

    useEffect(() => {
        if (!image) return
        if (typeof image === 'string') fetchImageData(image)
        else setImageData(image)
    }, [])

    const fetchImageData = async id => {

        const image = await getImageDataById(id)
        
        dispatch({ type: 'UPDATE_IMAGE', image })
        setImageData(image)
    }

    const isImageProfileImage = id => {
        let imageId = null
        const { profileImage } = user
        let profileImageId = null
        if (profileImage) profileImageId = user.profileImage._id || profileImage
        else return null
        
        if (profileImageId && profileImageId === id) imageId === profileImageId
        else return null
            
        return imageId
    }

    const isImageProductImage = (id, products) => {
        let imageId = null
        products.map(product => {
            if (product.imageId === id) imageId = product.imageId
        })
        return imageId
    }

    const deleteImage = async () => {

        const imageId = imageData._id

        dispatch({ type: 'REMOVE_IMAGE', id: imageId })

        const isProfileImage = isImageProfileImage(imageId)
        let isProductImage = null

        if (user.role === 'vendor' && user.products) {
            isProductImage = isImageProductImage(imageId, user.products)
        }
        
        setLoading('Deleting Image...')

        const { data } = await axios
            .post('/api/images/delete', {
                imageId: imageData._id,
                isProductImage,
                isProfileImage,
            })
        
        if (!data) {
            console.log('Error deleting image.')
            setLoading(null)
            return null
        }
        
        setLoading(null)
        
        onDelete(data.id, isProfileImage, isProductImage)
    }

    const setAvatar = async () => {
        
        setLoading('Setting Avatar...')

        const { data } = await axios
            .post('/api/user/avatar', {
                userId: user._id,
                imageId: imageData._id
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
        if (!user.profileImage) return true
        if (typeof user.profileImage === 'string' && user.profileImage === imageData._id) return true
        if (user.profileImage._id !== imageData._id) return true
        return false
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
                width={200}
                height={200}
                source={{
                    uri: `${IMAGE_PATH}/${user.username}/${imageData.filename}`,
                }}
                style={{
                    resizeMode: resize,
                    width,
                    height,
                    borderWidth: 1,
                    marginVertical: layout.verticalMargin,
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

        </View>
    ) : null
}
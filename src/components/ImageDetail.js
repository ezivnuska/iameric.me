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

export default ({ closeModal, onDelete, imageData, width = 200, height = 200, resize = 'stretch' }) => {

    const {
        dispatch,
        user,
    } = useContext(AppContext)

    const [loading, setLoading] = useState(null)
    const [image, setImage] = useState(null)

    useEffect(() => {
        if (imageData) {
            if (typeof imageData === 'string') fetchImageData(imageData)
            else setImage(imageData)
        }
    }, [])

    const fetchImageData = async id => {

        const data = await getImageDataById(id)
        console.log('ImageDetail:UPDATE_IMAGE:', data)
        dispatch({ type: 'UPDATE_IMAGE', image: data })
        setImage(data)
    }

    const isImageProfileImage = id => {
        if (!user.profileImage) return null
        return user.profileImage === id ? true : false
    }

    const isImageProductImage = (id, products) => {
        let imageId = null
        products.map(product => {
            if (product.imageId === id) imageId = product.imageId
        })
        return imageId
    }

    const deleteImage = async () => {

        const imageId = image._id

        dispatch({ type: 'REMOVE_IMAGE', id: imageId })

        const isProfileImage = isImageProfileImage(imageId)

        let isProductImage = null
        if (user.role === 'vendor' && user.products) {
            isProductImage = isImageProductImage(imageId, user.products)
        }
        
        setLoading('Deleting Image...')

        const { data } = await axios
            .post('/api/images/delete', {
                imageId,
                isProductImage,
                isProfileImage,
            })
        
        if (!data) {
            console.log('Error deleting image.')
            setLoading(null)
            return null
        }

        console.log('deleted image:data:', data)
        
        setLoading(null)
        
        onDelete(data.id, isProfileImage, isProductImage)
    }

    const setAvatar = async () => {
        
        setLoading('Setting Avatar...')

        const { data } = await axios
            .post('/api/user/avatar', {
                userId: user._id,
                imageId: image._id,
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
        if (typeof user.profileImage === 'string' && user.profileImage === image._id) return true
        if (user.profileImage._id !== image._id) return true
        return false
    }

    return image ? (
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
                    uri: `${IMAGE_PATH}/${user.username}/${image.filename}`,
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
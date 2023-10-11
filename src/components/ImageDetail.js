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

export default ({ onComplete, image, width = 200, height = 200, resize = 'stretch' }) => {

    const {
        dispatch,
        user,
    } = useContext(AppContext)

    const [loading, setLoading] = useState(null)
    const [imageData, setImageData] = useState(null)

    useEffect(() => {
        if (!image) return
        if (!image.filename) fetchImageData(image)
        else setImageData(image)
    }, [])

    const fetchImageData = async id => {
        const image = await getImageDataById(id)
        dispatch({ type: 'UPDATE_IMAGE', image })
        setImageData(image)
    }

    const isAvatar = () => user.profileImage && user.profileImage._id === image

    const deleteImage = async () => {
        
        setLoading('Deleting Image...')

        const { data } = await axios
            .post('/api/images/delete', { _id: imageData._id })
        
        if (!data) return console.log('Error deleting image.')
        
        dispatch({ type: 'REMOVE_IMAGE', id: data.id })
        
        setLoading(null)
        
        onComplete()
    }

    const setAvatar = async () => {
        
        setLoading('Setting Avatar...')

        const { data } = await axios
            .post('/api/user/avatar', {
                userId: user._id,
                imageId: imageData._id
            })
        
        if (data) dispatch({ type: 'SET_PROFILE_IMAGE', profileImage: data })
        else console.log('Error setting profileImage.')
        
        setLoading(null)
        
        onComplete()
    }

    return !loading ? (
        <View
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'center',
            }}
        >
            <Image
                width='auto'
                height='auto'
                source={{
                    uri: imageData
                        ? `${IMAGE_PATH}/${user.username}/${imageData.filename}`
                        : `${IMAGE_PATH}/avatar-default.png`
                    }}
                style={{
                    resizeMode: resize,
                    width,
                    height,
                    borderWidth: 1,
                    marginVertical: layout.verticalMargin,
                }}
            />

            {imageData ? (
                <View
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                        width: '100%',
                        paddingVertical: layout.verticalPadding,
                    }}
                >
                    {!isAvatar() && <Button onClick={setAvatar}>Make Avatar</Button>}
                    <Button onClick={deleteImage}>Delete</Button>
                </View>
            ) : null}

        </View>
    ) : (
        <LoadingView label={loading} />
    )
}
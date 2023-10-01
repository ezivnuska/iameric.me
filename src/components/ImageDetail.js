import React, { useContext, useState } from 'react'
import {
    Image,
    View,
} from 'react-native'
import { AppContext } from '../AppContext'
import { Button } from 'antd'
import axios from 'axios'
import layout from '../styles/layout'

const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets/images' : '/assets/images'

export default ({ image, width = 100, height = 100, resize = 'stretch' }) => {

    const {
        dispatch,
        user,
    } = useContext(AppContext)

    const [loading, setLoading] = useState(false)

    const isAvatar = () => user.profileImage && user.profileImage._id === image._id

    const deleteImage = async () => {
        
        setLoading(true)
        
        const { data } = await axios
            .post('/api/images/delete', { _id: image._id })
        
        console.log('image delete result: data:', data)
        
        setLoading(false)
        
        if (!data.user) return console.log('Error deleting image.')

        dispatch({ type: 'REMOVE_IMAGE', id: image._id })
        // dispatch({ type: 'SET_USER', user: data.user })
    }

    const setAvatar = async () => {
        
        setLoading(true)
        
        const profileImage = await axios
            .post('/api/user/avatar', {
                userId: user._id,
                imageId: image._id
            })
        
        dispatch({ type: 'SET_PROFILE_IMAGE', profileImage })
        
        setLoading(false)
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
                width={width}
                height={height}
                source={{ uri: `${IMAGE_PATH}/${user.username}/${image.filename}` }}
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
                {!isAvatar() && <Button onClick={setAvatar}>Make Avatar</Button>}
                <Button onClick={deleteImage}>Delete</Button>
            </View>

        </View>
    ) : null
}
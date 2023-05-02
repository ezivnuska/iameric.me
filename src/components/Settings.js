import React, { useContext, useEffect, useState } from 'react'
import {
    View,
} from 'react-native-web'
import {
    AvatarModule,
    ImageList,
    Profile,
} from '.'
import axios from 'axios'
import { AppContext } from '../AppContext'

const Settings = () => {
    const {
        dispatch,
        state,
    } = useContext(AppContext)

    const { user } = state
    const [ images, setImages ] = useState(null)
    const [ loading, setLoading ] = useState(false)

    useEffect(() => {
        if (user) getImages()
    }, [user])
    
    const getImages = () => {
        setLoading(true)
        const userId = user._id
        axios
            .get(`/api/user/images/${userId}`)
            .then(({ data }) => {
                setLoading(false)
                setImages(data.images)
            })
            .catch(err => {
                setLoading(false)
                console.log('Error getting images', err)
            })
    }

    const setAvatar = (_id, filename) => {
        axios
            .post('/api/user/avatar', { _id, filename })
            .then(({ data }) => {
                dispatch({ type: 'SET_USER', user: data.user })
            })
            .catch(err => console.log(`Catch: Error setting avatar with filename ${filename}`, err))
    }

    const deleteImage = (_id, filename) => {
        axios
            .post('/api/images/delete', { _id, filename, userId: user._id, username: user.username })
            .then(({ data }) => {
                const { error, success, user } = data
                if (error) console.log('Error deleting image', error)
                console.log('delete:user:', user)
                dispatch({ type: 'SET_USER', user })
                setImages(images.filter(image => image._id !== _id))
            })
            .catch(err => console.log(`Catch: Error deleting filename: ${filename}`, err))
    }

    return (
        <View>
            <Profile user={user} />
            <AvatarModule />
            <ImageList
                deleteImage={(_id, filename) => deleteImage(_id, filename)}
                setAvatar={(_id, filename) => setAvatar(_id, filename)}
                images={images}
                user={user}
            />
        </View>
    )
}

export default Settings
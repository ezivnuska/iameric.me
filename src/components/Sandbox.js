import React, { useContext, useEffect, useState } from 'react'
import {
    View,
} from 'react-native-web'
import {
    AvatarModule,
    ImageList,
    Profile,
} from '../components'
import axios from 'axios'
import { AppContext } from '../AppContext'
const API_PATH = '/api'

const Sandbox = () => {
    const {
        dispatch,
        state,
    } = useContext(AppContext)

    const { user } = state
    const [ images, setImages ] = useState(null)

    useEffect(() => {
        // getImages()
    }, [])

    useEffect(() => {
        getImages()
    }, [user])

    const getImages = () => {
        const userId = user._id
        axios
            .get(`${API_PATH}/user/images/${userId}`)
            .then(({ data }) => setImages(data.images))
            .catch(err => console.log('Error getting images', err))
    }

    const setAvatar = (_id, filename) => {
        console.log('setting avatar with', _id, filename)
        axios
            .post(`${API_PATH}/user/avatar`, { _id, filename })
            .then(({ data }) => dispatch({ type: 'SET_USER', user: data.user }))
            .catch(err => console.log(`Catch: Error setting avatar with filename ${filename}`, err))
    }

    const deleteImage = (_id, filename) => {
        axios
            .post(`${API_PATH}/images/delete`, { _id, filename, userId: user._id, username: user.username })
            .then(() => images.filter(image => image._id !== _id))
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

export default Sandbox
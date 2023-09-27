import React, { useContext, useEffect, useState } from 'react'
import {
    Text,
    View,
} from 'react-native'
import {
    ImageDisplay,
    LoadingView,
} from './'
import axios from 'axios'
import { AppContext } from '../AppContext'

const ImageList = () => {

    const {
        dispatch,
        user,
    } = useContext(AppContext)

    const [ images, setImages ] = useState(null)
    const [ loading, setLoading ] = useState(false)

    useEffect(() => {
        getImages()
    }, [])

    const getImages = async () => {
        
        setLoading(true)

        const { data } = await axios.
            get(`/api/user/images/${user._id}`)

        setImages(data.images)
        
        setLoading(false)
    }

    const setAvatar = async (userId, imageId) => {
        
        setLoading(true)
        
        const profileImage = await axios.post('/api/user/avatar', { userId, imageId })
        
        dispatch({ type: 'SET_PROFILE_IMAGE', profileImage })
        
        setLoading(false)
    }

    const trimImages = id => setImages(images.filter(image => image._id !== id))

    const deleteImage = (userId, imageId) => {
        axios
            .post('/api/images/delete', { _id: userId })
            .then(({ data }) => {
                const { user } = data
                if (user) dispatch({ type: 'SET_USER', user })
                trimImages(userId)
            })
            .catch(err => console.log(`Catch: Error deleting filename: ${filename}`, err))
    }

    const renderImages = () => (
        <View style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            flexWrap: 'wrap',
            gap: 10,
            width: '100%',
        }}>
            {images.map((item, index) => (
                <View
                    style={{
                        flex: 1,
                        flexBasis: 'auto',
                    }}
                    key={`image-${index}`}
                >
                    <ImageDisplay
                        path={`${user.username}/${item.filename}`}
                        deleteImage={() => deleteImage(item._id, item.filename)}
                        setAvatar={() => setAvatar(user._id, item._id)}
                    />
                </View>
            ))}
        </View>
    )

    return loading ? <LoadingView label='Loading Images...' />
        : (images && images.length) ? renderImages()
        : <Text>No images to display.</Text>
}

export default ImageList
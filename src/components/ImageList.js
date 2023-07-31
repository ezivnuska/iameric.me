import React, { useContext, useEffect, useState } from 'react'
import {
    ActivityIndicator,
    FlatList,
    StyleSheet,
    Text,
    View,
} from 'react-native'
import {
    ImageDisplay,
    ImageLoader,
} from './'
import axios from 'axios'
import { AppContext } from '../AppContext'

const ImageList = () => {

    const {
        dispatch,
        state,
        user,
    } = useContext(AppContext)

    const [ images, setImages ] = useState(null)
    const [ loading, setLoading ] = useState(false)

    useEffect(() => {
        getImages()
    }, [])
    useEffect(() => {
        getImages()
    }, [user])
    
    const getImages = async () => {
        setLoading(true)
        const items = await axios.
            get(`/api/user/images/${user._id}`).
            then(({ data }) => data.images)
        setLoading(false)
        setImages(items)
    }

    // useEffect(() => {
    //     console.log('images', images)
    //     if (images) setItems(images)
    // }, [])

    const setAvatar = async (userId, imageId) => {
        const { data } = await axios.post('/api/user/avatar', { userId, imageId })
        dispatch({ type: 'SET_USER', user: data })
        return
    }

    const trimImages = id => setImages(images.filter(image => image._id !== id))

    const deleteImage = (userId, imageId) => {
        axios
            // .post('/api/images/delete', { _id, filename, user: user._id, username: user.username })
            .post('/api/images/delete', { _id: userId })
            .then(({ data }) => {
                const { user } = data
                if (user) dispatch({ type: 'SET_USER', user })
                trimImages(userId)
            })
            .catch(err => console.log(`Catch: Error deleting filename: ${filename}`, err))
    }

    const renderItems = () => (images && images.length) ? (
        <View style={styles.list}>
            {images.map((item, index) => (
                <View
                    style={styles.item}
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
    ) : <Text>No images to display.</Text>

    return (
        <View style={styles.container}>
            {images
                ? renderItems()
                : <ActivityIndicator size='small' />
            }
        </View>
    )
}

export default ImageList

const styles = StyleSheet.create({
    container: {

    },
    list: {
        display: 'flex',
        flexDirection: 'row',
        flexGrow: 0,
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        gap: 10,
		minWidth: 350,
        maxWidth: 350,
        width: 350,
        marginHorizontal: 'auto',
    },
    item: {
        flex: 1,
        flexBasis: 'auto',
        flexShrink: 0,
        flexGrow: 1,
    },
})
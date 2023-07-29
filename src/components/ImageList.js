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
    } = useContext(AppContext)

    const { user } = state
    const [ images, setImages ] = useState(null)
    const [ loading, setLoading ] = useState(false)

    useEffect(() => {
        if (user) {
            getImages()
        }
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

    // useEffect(() => {
    //     console.log('images', images)
    //     if (images) setItems(images)
    // }, [])

    const setAvatar = (_id, filename) => {
        dispatch({ type: 'SET_STATUS', status: 'Setting avatar...'})
        axios
            .post('/api/user/avatar', { _id, filename })
            .then(({ data }) => {
                dispatch({ type: 'SET_PROFILE_IMAGE', image: _id })
                dispatch({ type: 'SET_STATUS', status: 'Avatar saved.'})
            })
            .catch(err => console.log(`Catch: Error setting avatar with filename ${filename}`, err))
    }

    const trimImages = id => setImages(images.filter(image => image._id !== id))

    const deleteImage = (_id, filename) => {
        axios
            // .post('/api/images/delete', { _id, filename, user: user._id, username: user.username })
            .post('/api/images/delete', { _id })
            .then(({ data }) => {
                const { user } = data
                if (user) dispatch({ type: 'SET_USER', user })
                trimImages(_id)
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
                        username={user.username}
                        filename={item.filename}
                        deleteImage={() => deleteImage(item._id, item.filename)}
                        setAvatar={() => setAvatar(user._id, item.filename)}
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
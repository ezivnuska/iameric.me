import React, { useContext, useEffect, useState } from 'react'
import {
    ActivityIndicator,
    FlatList,
    StyleSheet,
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

    // useEffect(() => {
    //     console.log('images', images)
    //     if (images) setItems(images)
    // }, [])

    const setAvatar = (_id, filename) => {
        dispatch({ type: 'SET_STATUS', status: 'Setting avatar...'})
        axios
            .post('/api/user/avatar', { _id, filename })
            .then(({ data }) => {
                dispatch({ type: 'SET_PROFILE_IMAGE', image: filename })
                dispatch({ type: 'SET_STATUS', status: 'Avatar saved.'})
            })
            .catch(err => console.log(`Catch: Error setting avatar with filename ${filename}`, err))
    }

    const trimImages = id => setImages(images.filter(image => image._id !== id))

    const deleteImage = (_id, filename) => {
        dispatch({ type: 'SET_STATUS', status: 'Deleting image...'})
        axios
            .post('/api/images/delete', { _id, filename, userId: user._id, username: user.username })
            .then(({ data }) => {
                const { error, success, user } = data
                if (error) console.log('Error deleting image', error)
                // console.log('delete:user:', user)
                if (user) dispatch({ type: 'SET_USER', user })
                trimImages(_id)
                dispatch({ type: 'SET_STATUS', status: 'Avatar deleted.'})
            })
            .catch(err => console.log(`Catch: Error deleting filename: ${filename}`, err))
    }

    return (
        <View style={styles.container}>
            {images ? (
                <FlatList
                    contentContainerStyle={styles.list}
                    data={images}
                    listKey={() => 'images'}
                    keyExtractor={(filename, index) => `${filename}${index}`}
                    numColumns={3}
                    renderItem={({ item }) => (
                        <View style={styles.item}>
                            <ImageDisplay
                                username={user.username}
                                filename={item.filename}
                                deleteImage={() => deleteImage(item._id, item.filename)}
                                setAvatar={() => setAvatar(user._id, item.filename)}
                            />
                        </View>
                    )}
                />
            ) : <ActivityIndicator size='small' />}
        </View>
    )
}

export default ImageList

const styles = StyleSheet.create({
    container: {
        // marginHorizontal: 'auto',
        paddingHorizontal: 10,
        paddingTop: 10,
        borderWidth: 1,
        borderColor: '#aaa',
        borderRadius: 10,
    },
    list: {
        display: 'flex',
        flexDirection: 'row',
        flexGrow: 0,
        justifyContent: 'center',
    },
    item: {
        flex: 1,
        flexBasis: 'auto',
        flexShrink: 0,
        flexGrow: 0,
        marginHorizontal: 2,
        marginBottom: 10,
    }
})
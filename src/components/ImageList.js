import React, { useEffect, useState } from 'react'
import {
    FlatList,
    StyleSheet,
    View,
} from 'react-native-web'
import {
    ImageDisplay,
} from './'
import axios from 'axios'
const API_PATH = '/api'

const ImageList = ({ user }) => {

    const [ images, setImages ] = useState(null)
    const [ updated, setUpdated ] = useState(false)

    const getImagePaths = () => images.map(image => image.filename)

    const getImages = () => {
        const userId = user._id
        axios
            .get(`${API_PATH}/user/images/${userId}`)
            .then(({ data }) => setImages(data.images))
            .catch(err => console.log('Error getting images', err))
    }

    useEffect(() => {
        if (user) getImages()
    }, [user])

    useEffect(() => {
        if (updated) {
            setUpdated(false)
            getImages()
        }
    }, [updated])
    
    return images ? (
        <View style={styles.container}>
            <FlatList
                contentContainerStyle={styles.list}
                data={getImagePaths()}
                keyExtractor={(filename, index) => 'key' + index}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <ImageDisplay path={`${user.username}/${item}`} />
                    </View>
                )}
            />
        </View>
    ) : null
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
    },
    item: {
        flex: 1,
        flexBasis: 'auto',
        flexShrink: 0,
        flexGrow: 0,
    }
})
import React, { useContext, useEffect, useState } from 'react'
import {
    ActivityIndicator,
    Image,
    ImageBackground,
    StyleSheet,
    View,
} from 'react-native'
import axios from 'axios'
import { AppContext } from '../AppContext'
const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets/images' : '/images'
const defaultImage = { uri: `${IMAGE_PATH}/avatar-default.png` }

const Avatar = ({ userId, size = 100, ...props }) => {

    const {
        dispatch,
        state,
    } = useContext(AppContext)

    const { user } = state
    const [loading, setLoading] = useState(false)
    const [loaded, setLoaded] = useState(false)
    const [imagePath, setImagePath] = useState(null)

    useEffect(() => {
        getUser()
    }, [user])

    const getUser = async () => {
        if (loaded) setLoaded(false)
        await axios
            .get(`/api/users/${userId}`)
            .then(({ data }) => {
                const { user } = data
                setImagePath(user.profileImage ? `${IMAGE_PATH}/${user.username}/${user.profileImage}` : null)
                setLoaded(true)
            })
            .catch(err => console.log('Error getting author', err))
    }

    return (
        <View style={[styles.container, { height: size, width: size }]} {...props}>
            <Image
                width={size}
                height={size}
                style={[
                    styles.stretch,
                    {
                        width: size,
                        height: size,
                    }
                ]}
                onLoadStart={() => setLoading(true)}
                onLoadEnd={() => setLoading(false)}
                source={imagePath || defaultImage}
            />
        </View>
    )
}

export default Avatar

const styles = StyleSheet.create({
    container: {
    },
    stretch: {
        resizeMode: 'stretch',
    },
    background: {

    },
})
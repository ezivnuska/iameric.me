import React, { useEffect, useState } from 'react'
import {
    ActivityIndicator,
    Image,
    ImageBackground,
    StyleSheet,
    View,
} from 'react-native'
import axios from 'axios'
// import defaultAvatar from '../images/avatar-default.png'
const USER_IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets/images' : '/assets/images'
const IMAGE_PATH = __DEV__ ? '../../assets/images' : '/images'
const defaultImage = { uri: `${IMAGE_PATH}/avatar-default.png` }

const Avatar = ({ userId, size = 100, ...props }) => {

    // const { profileImage, username } = user
    // const [image, setImage] = useState(null)
    // useEffect(() => {
    //     setImage()
    // }, [user])

    const [loading, setLoading] = useState(true)
    const [loaded, setLoaded] = useState(false)
    const [image, setImage] = useState(null)
    const [username, setUsername] = useState(null)

    useEffect(() => {
        getUser()
    }, [])
    const getUser =() => {
        axios
            .get(`/api/users/${userId}`)
            .then(({ data }) => {
                setImage(data.profileImage)
                setUsername(data.username)
                setLoaded(true)
            })
            .catch(err => console.log('Error getting author', err))
    }

    return loaded ? (
        <View style={[styles.container, { height: size, width: size }]} {...props}>
            <ImageBackground source={defaultImage} style={[{ width: size, height: size, display: (loading ? 'none' : 'block') }, styles.background]}>
                {!loading ? (
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
                        source={`${USER_IMAGE_PATH}/${username}/${image}`}
                    />
                ) : <ActivityIndicator size='small' />}
            </ImageBackground>
        </View>
    ) : null
}

export default Avatar

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: 'red',
    },
    stretch: {
        resizeMode: 'stretch',
    },
    background: {

    },
})
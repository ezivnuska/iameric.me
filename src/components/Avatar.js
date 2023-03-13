import React, { useEffect, useState } from 'react'
import {
    Image,
    StyleSheet,
    View,
} from 'react-native'
import defaultAvatar from '../assets/images/avatar-default.png'

const Avatar = ({ user, size = 100, ...props }) => {

    const [ avatar, setAvatar ] = useState(defaultAvatar)
    const [ updated, setUpdated ] = useState(false)

    const getAvatar = async () => {
        const { profileImage, username } = user
        if (profileImage) {
            try {
                const image = await import(`../assets/images/users/${username}/${profileImage}`)
                setAvatar(image)
            } catch {
                console.log(`cannot retrieve profile image for ${username}`)
            }
        }
    }

    useEffect(() => {
        getAvatar(user.username)
    }, [])

    useEffect(() => {
        if (user) {
            getAvatar(user.username)
            setUpdated(true)
        }
    }, [user])

    useEffect(() => {
        if (updated) {
            setUpdated(false)
            if (avatar) setAvatar(avatar)
        }
    }, [avatar])

    return user ? (
        <View style={styles.container} {...props}>
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
                source={avatar.default ? ({
                    uri: avatar.default,
                }) : defaultAvatar}
            />
        </View>
    ) : null
}

export default Avatar

const styles = StyleSheet.create({
    container: {
        
    },
    stretch: {
        resizeMode: 'stretch',
    },
})
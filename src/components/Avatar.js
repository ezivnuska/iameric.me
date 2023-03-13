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
        try {
            const image = await import(`../assets/images/users/${username}/${profileImage}`)
            console.log('user has profile image', image)
            setAvatar(image)
        } catch {
            console.log(`no avatar found for ${username}`)
        }
    }

    useEffect(() => {
        if (user) {
            getAvatar(user.username)
            setUpdated(true)
        }
    }, [user])

    useEffect(() => {
        if (updated) {
            setAvatar(avatar)
            setUpdated(false)
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
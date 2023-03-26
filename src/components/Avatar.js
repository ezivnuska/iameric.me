import React from 'react'
import {
    Image,
    StyleSheet,
    View,
} from 'react-native'
import defaultAvatar from '../assets/images/avatar-default.png'

const Avatar = ({ user, size = 100, ...props }) => {

    const { profileImage, username } = user
    // const pathToAvatar = (process ? process.env.IMAGE_PATH : 'assets/images')
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
                source={
                    profileImage
                        ? `assets/images/${username}/${profileImage}`
                        : defaultAvatar
                }
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
import React from 'react'
import {
    Image,
    StyleSheet,
    View,
} from 'react-native'
// import defaultAvatar from '../images/avatar-default.png'
const USER_IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets/images' : '/assets/images'
const IMAGE_PATH = __DEV__ ? 'https://iameric.me/images' : '/images'

const Avatar = ({ user, size = 100, ...props }) => {

    const { profileImage, username } = user
    
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
                        ? `${USER_IMAGE_PATH}/${username}/${profileImage}`
                        : `${IMAGE_PATH}/avatar-default.png`
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
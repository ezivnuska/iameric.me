import React, { useState } from 'react'
import {
    ActivityIndicator,
    Image,
    StyleSheet,
    View,
} from 'react-native'
const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets/images' : '/images'

const Avatar = ({ path, size = 100, ...props }) => {

    const [loading, setLoading] = useState(true)

    return (
        <View style={[styles.container, { height: size, width: size }]} {...props}>
            <Image
                style={[
                    styles.stretch,
                    {
                        width: size,
                        height: loading ? 0 : size,
                    }
                ]}
                onLoadEnd={() => setLoading(false)}
                source={
                    path
                    ? `${IMAGE_PATH}/${path}`
                    : `${IMAGE_PATH}/avatar-default.png`
                }
            />
            {loading && <ActivityIndicator size='small' />}
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
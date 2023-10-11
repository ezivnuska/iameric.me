import React from 'react'
import {
    Image,
    View,
} from 'react-native'

const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'

const Avatar = ({ assetPath, size = 50, ...props }) => {

    return (
        <View
            {...props}
            style={{
                height: size,
                width: size
            }}
        >
            <Image
                style={{
                    width: size,
                    height: size,
                    resizeMode: 'stretch',
                }}
                // onLoadStart={() => setLoading(true)}
                // onLoadEnd={() => setLoading(false)}
                source={
                    filename
                    ? `${IMAGE_PATH}/${assetPath}`
                    : `${IMAGE_PATH}/avatar-default-small.png`
                }
            />
        </View>
    )
}

export default Avatar
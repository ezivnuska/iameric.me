import React from 'react'
import {
    Image,
    View,
} from 'react-native'

export default ({ path, ...props }) => {
    console.log('ImagePreview', path)
    return (
        <View
            style={{
                height: 50,
                width: 50,
                borderWidth: 1,
            }}
        >
            <Image
                {...props}
                style={{
                    width: 50,
                    height: 50,
                    resizeMode: 'stretch',
                }}
                source={path}
            />
        </View>
    )
}
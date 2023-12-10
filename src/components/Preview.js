import React from 'react'
import {
    Image,
    View,
} from 'react-native'

export default ({ height, width, uri }) => (
    <View
        style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
        }}
    >
        <Image
            width={width}
            height={height}
            style={{
                width,
                height,
                resizeMode: 'cover',
                borderWidth: 1,
            }}
            source={{ uri }}
        />
    </View>
)
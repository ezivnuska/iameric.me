import React from 'react'
import {
    Image,
} from 'react-native'

export default ({ path, size = 100 }) => (
    <Image
        width={size}
        height={size}
        source={{ uri: path }}
        style={{
            resizeMode: 'stretch',
            width: size,
            height: size,
            borderWidth: 1,
            borderColor: '#999',
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
        }}
    />
)
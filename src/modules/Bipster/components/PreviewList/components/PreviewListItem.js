import React from 'react'
import { Image } from 'react-native'

export default ({ uri, size }) => (
    <Image
        width={size}
        height={size}
        source={{ uri }}
        style={{
            resizeMode: 'cover',
            width: size,
            height: size,
        }}
    />
)
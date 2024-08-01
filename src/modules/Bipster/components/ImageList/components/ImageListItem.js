import React from 'react'
import { Image } from 'react-native'

export default ImageListItem = ({ image, size }) => (
    <Image
        width={size}
        height={size}
        source={{ uri: image }}
        style={{
            resizeMode: 'cover',
            width: size,
            height: size,
        }}
    />
)
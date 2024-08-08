import React from 'react'
import { Image } from 'react-native'

export default ImageListItem = ({ path, size }) => {
    console.log('ImageListItem:path:', path)
    return (
        <Image
            width={size}
            height={size}
            source={{ uri: `https://iameric.me/${path}` }}
            style={{
                resizeMode: 'cover',
                width: size,
                height: size,
            }}
        />
    )
}
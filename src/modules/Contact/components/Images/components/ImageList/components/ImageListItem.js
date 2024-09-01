import React from 'react'
import { Image } from 'react-native'

const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'

export default ImageListItem = ({ image, size }) => (
    <Image
        width={size}
        height={size}
        source={{ uri: `${IMAGE_PATH}/${image.user.username}/thumb/${image.filename}` }}
        resizeMode='cover'
        style={{
            width: size,
            height: size,
        }}
    />
)
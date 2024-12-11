import React from 'react'
import { Image } from 'react-native'

const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'

const ImageListItem = ({ image, dims }) => {
    const { height, width } = dims
    return (
        <Image
            source={{ uri: `${IMAGE_PATH}/${image.user.username}${width <= 200 ? `/thumb` : ''}/${image.filename}` }}
            resizeMode='cover'
            style={{
                width,
                height,
                marginHorizontal: 'auto',
            }}
        />
    )
}

export default ImageListItem
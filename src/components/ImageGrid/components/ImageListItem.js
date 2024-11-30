import React from 'react'
import { Image } from 'react-native'

const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'

const ImageListItem = ({ image, scale }) => {
    const width = scale > 1 ? image.width : image.width * scale
    const height = scale > 1 ? image.height : image.height * scale
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
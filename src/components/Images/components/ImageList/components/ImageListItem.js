import React from 'react'
import { Image } from 'react-native'

const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'

const ImageListItem = ({ image, scale }) => (
    <Image
        source={{ uri: `${IMAGE_PATH}/${image.user.username}/thumb/${image.filename}` }}
        resizeMode='cover'
        style={{
            width: scale > 1 ? image.width : image.width * scale,
            height: scale > 1 ? image.height : image.height * scale,
            marginHorizontal: 'auto',
        }}
    />
)

export default ImageListItem
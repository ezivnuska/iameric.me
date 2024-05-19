import React from 'react'
import {
    Image,
} from 'react-native'

const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'

export default ({ image, dims }) => (
    <Image
        source={{
            uri: `${IMAGE_PATH}/${image.user.username}/${image.filename}`,
        }}
        style={{
            resizeMode: 'contain',
            height: dims ? dims.height : image.height,
            width: dims ? dims.width : image.width,
            marginHorizontal: 'auto',
        }}
    />
)
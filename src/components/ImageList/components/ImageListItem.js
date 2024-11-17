import React from 'react'
import { Image } from 'react-native'

const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'

const ImageListItem = ({ image, size }) => (
    <Image
        // width={size}
        // height={size}
        source={{ uri: `${IMAGE_PATH}/${image.user.username}/thumb/${image.filename}` }}
        resizeMode='cover'
        style={{
            width: size,//'100%',
            height: size,//'100%',
        }}
    />
)

export default ImageListItem
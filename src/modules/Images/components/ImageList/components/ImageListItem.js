import React from 'react'
import { Image } from 'react-native'
import { useApp } from '@app'
import { useModal } from '@modal'

const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'


export default ImageListItem = ({ image, size }) => (
    <Image
        width={size}
        height={size}
        source={{ uri: `${IMAGE_PATH}/${image.user.username}/thumb/${image.filename}` }}
        style={{
            resizeMode: 'cover',
            width: size,
            height: size,
        }}
    />
)
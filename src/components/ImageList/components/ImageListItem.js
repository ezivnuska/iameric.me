import React from 'react'
import { Image } from 'react-native'
import { IMAGE_PATH } from '../../../../config'

const ImageListItem = ({ path, size }) => {
    const assetPath = process.env.IMAGE_PATH || IMAGE_PATH
    return (
        <Image
            width={size}
            height={size}
            source={{ uri: `${assetPath}/${path}` }}
            resizeMode='cover'
            style={{
                width: size,
                height: size,
            }}
        />
    )
}

export default ImageListItem
import React from 'react'
import { Image } from 'react-native'
import { IMAGE_PATH } from '../../../../../../../../../../config'

export default ({ path, size, ...props }) => {
    const assetPath = process.env.IMAGE_PATH || IMAGE_PATH
    return (
        <Image
            {...props}
            width={size}
            height={size}
            source={{ uri: `${assetPath}/${path}` }}
            style={{
                resizeMode: 'cover',
                width: size,
                height: size,
            }}
        />
    )
}
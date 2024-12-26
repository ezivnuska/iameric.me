import React, { useMemo } from 'react'
import { Image } from 'react-native'
import { useApp } from '@context'

const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'

const ImageContained = ({ source }) => {

    // const { dims, landscape } = useApp()
    // const uri = useMemo(() => `${IMAGE_PATH}/${image.user.username}/${image.filename}`, [image])

    return (
        <Image
            source={source}
            resizeMode='contain'
            style={{
                flex: 1,
                alignSelf: 'stretch',
                // height: dims.height,
                // width: '100%',
                // backgroundColor: 'pink',
                // borderWidth: 1,
                // borderColor: 'red',
            }}
        />
    )
}

export default ImageContained
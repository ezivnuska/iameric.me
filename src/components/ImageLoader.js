import React, { useEffect, useState } from 'react'
import { Image } from 'react-native'
import { getMaxImageDims } from '@utils/images'
import { Paths } from '@constants'


const ImageLoader = ({ image, user, memoryId = null }) => {

    const [imageDims, setImageDims] = useState(null)

    const maxSize = 200

    useEffect(() => {
        const { width, height } = getMaxImageDims(image.width, image.height, { width: maxSize, height: maxSize })
        setImageDims({ width, height })
    }, [image])

    return imageDims && (
        <Image
            source={image?.uri ? { uri: image.uri } : `${Paths.ASSETS}/${user.username}/${image.filename}`}
            resizeMode='contain'
            style={{
                height: imageDims.height,
                width: imageDims.width,
                opacity: image?.uri ? 0.7 : 1.0,
            }}
        />
    )
}

export default ImageLoader
import React, { useEffect, useMemo, useState } from 'react'
import { Image, View } from 'react-native'
import { getMaxImageDims } from '@utils/images'

const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'

const ImageContainer = ({ image }) => {

    const [maxWidth, setMaxWidth] = useState(null)
    const [imageDims, setImageDims] = useState(null)

    const uri = useMemo(() => `${IMAGE_PATH}/${image.user.username}/${image.filename}`, [image])

    useEffect(() => {
        setImageDims(getMaxImageDims(image.width, image.height, maxWidth))
    }, [maxWidth])

    const onLayout = e => {
        if (e.nativeEvent.target.offsetParent) {
            setMaxWidth(e.nativeEvent.target.offsetParent.clientWidth)
        }
    }

    return (
        <View onLayout={onLayout}>
            {imageDims && (
                <Image
                    source={{ uri }}
                    resizeMode='contain'
                    style={{
                        width: imageDims.width,
                        height: imageDims.height,
                    }}
                />
            )}
        </View>
    )
}

export default ImageContainer
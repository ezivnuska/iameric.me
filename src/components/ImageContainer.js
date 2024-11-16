import React, { useEffect, useMemo, useState } from 'react'
import { Image, ScrollView, View } from 'react-native'
import { getMaxImageDims } from '@utils/images'
import { useApp } from '@app'

const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'

const ImageContainer = ({ image }) => {

    const { dims } = useApp()

    // const [maxWidth, setMaxWidth] = useState(null)
    const [maxHeight, setMaxHeight] = useState(null)
    const [imageDims, setImageDims] = useState(null)

    const uri = useMemo(() => `${IMAGE_PATH}/${image.user.username}/${image.filename}`, [image])

    // useEffect(() => {
    //     console.log('imageDims', imageDims)
    // }, [imageDims])

    useEffect(() => {
        // console.log('maxWidth', maxWidth)
        console.log('maxHeight', maxHeight)
        // if (!imageDims) setImageDims(getMaxImageDims(image.width, image.height, maxWidth))
    }, [maxHeight])

    // useEffect(() => {
    //     if (!imageDims) setImageDims(getMaxImageDims(image.width, image.height, maxWidth))
    // }, [maxWidth, maxHeight])

    const onLayout = e => {
        if (e.nativeEvent.target.offsetParent) {
            const parentWidth = e.nativeEvent.target.offsetParent.clientWidth
            setMaxHeight(e.nativeEvent.target.offsetParent.clientHeight)
            const imageDims = getMaxImageDims(image.width, image.height, parentWidth)
            setImageDims(imageDims)
        }
    }

    return dims && (
        <View
            onLayout={onLayout}
            style={{ height: maxHeight }}
        >
            {maxHeight && (
                <ScrollView
                    style={{ height: maxHeight }}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}
                >
                    <Image
                        source={{ uri }}
                        resizeMode='contain'
                        style={{
                            width: imageDims.width,
                            height: imageDims.height,
                            marginHorizontal: 'auto',
                        }}
                    />
                </ScrollView>
            )}
        </View>
    )
}

export default ImageContainer
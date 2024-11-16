import React, { useMemo, useState } from 'react'
import { Image, ScrollView, View } from 'react-native'
import { getMaxImageDims } from '@utils/images'
import { useApp } from '@app'

const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'

const ImageContainer = ({ image }) => {

    const { dims } = useApp()

    const [maxHeight, setMaxHeight] = useState(null)
    const [imageDims, setImageDims] = useState(null)

    const uri = useMemo(() => `${IMAGE_PATH}/${image.user.username}/${image.filename}`, [image])

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
                    contentContainerStyle={{ flex: 1 }}
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
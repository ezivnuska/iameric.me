import React, { useMemo, useState } from 'react'
import { Image, ScrollView, View } from 'react-native'
import { getMaxImageDims } from '@utils/images'
import { useApp } from '@app'

const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'

const ImageContainer = ({ image }) => {

    const { dims } = useApp()

    const [imageDims, setImageDims] = useState(null)

    const uri = useMemo(() => `${IMAGE_PATH}/${image.user.username}/${image.filename}`, [image])

    const onLayout = e => {
        const parentWidth = e.nativeEvent.target.offsetParent.clientWidth
        const dimensions = getMaxImageDims(image.width, image.height, parentWidth)
        setImageDims(dimensions)
    }

    return dims && (
        <View
            onLayout={onLayout}
            style={{ flex: 1 }}
        >
            {imageDims && (
                <ScrollView
                    style={{ flex: 1 }}
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
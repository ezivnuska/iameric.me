import React, { useEffect, useRef, useState } from 'react'
import {
    Image,
    View,
} from 'react-native'
import { useApp } from '@app'
import { ActivityIndicator } from 'react-native-paper'

export default ({ previews }) => {

    const {
        dims,
        theme,
    } = useApp()

    const imageGap = 4

    const containerRef = useRef(null)

    const numImagesPerRow = 3

    const [imageSize, setImageSize] = useState(0)

    useEffect(() => {
        if (containerRef) {
            setImageSize((containerRef.current.clientWidth - (imageGap * (numImagesPerRow - 1)) - numImagesPerRow * 2) / numImagesPerRow)
        }
    }, [dims])

    const buttonStyle = {
        borderWidth: 1,
        borderColor: theme?.colors.border,
        shadowColor: theme?.colors.shadow,
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3,
        elevation: 1,
        backgroundColor: theme?.colors.background,
    }
    
    return (
        <View
            ref={containerRef}
            style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                gap: imageGap,
                width: '100%',
            }}
        >
            {previews.map((preview, index) => (
                <View
                    key={`image-${index}`}
                    style={[
                        {
                            width: imageSize,
                            height: imageSize,
                        },
                        buttonStyle,
                    ]}
                >
                    <Image
                        width={imageSize}
                        height={imageSize}
                        source={{ uri: preview.uri }}
                        style={{
                            resizeMode: 'cover',
                            width: imageSize,
                            height: imageSize,
                        }}
                    />
                </View>
            ))}

        </View>
    )
}
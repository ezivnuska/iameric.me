import React, { useEffect, useRef, useState } from 'react'
import {
    // Pressable,
    View,
} from 'react-native'
// import Icon from 'react-native-vector-icons/Ionicons'
import { useApp } from '@app'
// import { useModal } from '@modal'
import { ImageListItem } from './components'
import { ActivityIndicator } from 'react-native-paper'

export default ImageList = ({ images, loading }) => {

    const {
        dims,
        theme,
    } = useApp()
    
    // const { setModal } = useModal()

    const imageGap = 4

    const containerRef = useRef(null)

    const numImagesPerRow = 4

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
            {images.map((image, index) => (
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
                    <ImageListItem
                        image={image}
                        size={imageSize}
                    />
                </View>
            ))}

            {loading && (
                <View
                    key={`image-${images.length}`}
                    style={[
                        {
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: imageSize,
                            height: imageSize,
                        },
                        buttonStyle,
                    ]}
                >
                    <ActivityIndicator size='small' />
                </View>
            )}

        </View>
    )
}
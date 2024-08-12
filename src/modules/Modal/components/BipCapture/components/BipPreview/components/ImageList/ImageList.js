import React, { useEffect, useRef, useState } from 'react'
import {
    Image,
    View,
} from 'react-native'
import { ActivityIndicator } from '@components'
import { useApp } from '@app'

const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'

export default ImageList = ({ images, uploading, small = false }) => {

    const { dims, theme } = useApp()

    const imageGap = 1

    const containerRef = useRef(null)

    const numImagesPerRow = small ? 5 : 3

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
            {images
                ? images.map((image, index) => {
                    const uri = image.imageData ? image.imageData.uri : `${IMAGE_PATH}/${image.path}/${image.filename}`
                    return (
                        <View
                            key={`bip-image-${index}`}
                            style={{
                                position: 'relative',
                                width: imageSize,
                                height: imageSize,
                            }}
                        >
                            <Image
                                width={imageSize}
                                height={imageSize}
                                source={{ uri }}
                                style={[
                                    {
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        resizeMode: 'cover',
                                        width: imageSize,
                                        height: imageSize,
                                        opacity: (uploading && image.imageData) ? 0.5 : 1,
                                        zIndex: 10,
                                    },
                                    buttonStyle,
                                ]}
                            />
                            
                            {(uploading && image.imageData) && (
                                <View
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        zIndex: 100,
                                        width: imageSize,
                                        height: imageSize,
                                    }}
                                >
                                    <ActivityIndicator />
                                </View>
                            )}
                        </View>
                    )
                })
                : null
            }

        </View>
    )
}
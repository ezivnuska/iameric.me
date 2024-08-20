import React, { useEffect, useRef, useState } from 'react'
import {
    Image,
    Pressable,
    View,
} from 'react-native'
import { ActivityIndicator } from '@components'
import { useApp } from '@app'
import Icon from 'react-native-vector-icons/Ionicons'

const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'

export default ({ images, remove, uploading, small = false }) => {

    const { dims, theme } = useApp()

    const imageGap = 5

    const containerRef = useRef(null)

    const numImagesPerRow = small ? 6 : 4

    const [imageSize, setImageSize] = useState(0)

    useEffect(() => {
        if (containerRef) {
            setImageSize((containerRef.current.clientWidth - (imageGap * (numImagesPerRow - 1))) / numImagesPerRow)
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
                flex: 1,
                flexDirection: 'row',
                alignItems: 'flex-start',
                alignContent: 'flex-start',
                flexWrap: 'wrap',
                gap: imageGap,
                width: '100%',
            }}
        >
            {images
                ? images.map((image, index) => {
                    let uri = image.imageData ? image.imageData.uri : image.uri ? image.uri : `${IMAGE_PATH}/${image.path}/${image.filename}`
                    return (
                        <View
                            key={`bip-image-${index}`}
                            style={{
                                flexBasis: 'auto',
                                position: 'relative',
                                width: imageSize,
                                height: imageSize,
                                background: '#000',
                            }}
                        >
                            <Image
                                width={imageSize}
                                height={imageSize}
                                source={{ uri: uri || image.imageData.uri }}
                                style={[
                                    {
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        resizeMode: 'cover',
                                        width: imageSize,
                                        height: imageSize,
                                        opacity: (uploading === index) ? 0.75 : 1,
                                        zIndex: 10,
                                    },
                                    buttonStyle,
                                ]}
                            />

                            {uploading === index ? (
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
                                    <ActivityIndicator color='#fff' />
                                </View>
                            ) : (
                                <Pressable
                                    onPress={() => remove(index)}
                                    style={{
                                        position: 'absolute',
                                        top: 5,
                                        right: 5,
                                        zIndex: 50,
                                    }}
                                >
                                    <Icon
                                        name='close-sharp'
                                        size={18}
                                        color='#fff'
                                    />
                                </Pressable>
                            )}
                        </View>
                    )
                })
                : null
            }

        </View>
    )
}
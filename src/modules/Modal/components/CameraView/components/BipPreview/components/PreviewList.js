import React, { useEffect, useRef, useState } from 'react'
import {
    Image,
    Pressable,
    ScrollView,
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
        <ScrollView
            showsVerticalScrollIndicator={false}
            style={{
                flex: 1,
                width: '100%',
                height: '100%',
            }}
            ref={containerRef}
            contentContainerStyle={{
                flex: 1,
                width: '100%',
            }}
        >
            <View
                style={{
                    flex: 1,
                    flexGrow: 0,
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                    flexWrap: 'wrap',
                    gap: imageGap,
                    paddingBottom: 5,
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
                                    resizeMode='cover'
                                    style={[
                                        {
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            width: imageSize,
                                            height: imageSize,
                                            opacity: (uploading === index) ? 0.75 : 1,
                                            zIndex: 10,
                                        },
                                        buttonStyle,
                                    ]}
                                />

                                {uploading === index && (
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
                                )}
                                
                                {uploading === null && (
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

        </ScrollView>
    )
}
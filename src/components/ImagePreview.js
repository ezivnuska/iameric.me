import React, { useState } from 'react'
import { Image, View } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'


const ImagePreview = ({ preview, width, height, uploading }) => {

    const [imageLoaded, setImageLoaded] = useState(false)

    const onLayout = () => {
        setImageLoaded(true)
    }

    return (
        <View
            style={{
                flex: 1,
                width,
                height,
                flexDirection: 'row',
                alignItems: 'center',
                position: 'relative',
            }}
        >
            {imageLoaded && (
                <View
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        zIndex: 100,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        background: `rgba(0, 0, 0, ${uploading ? 0.8 : 0.5})`,
                    }}
                >
                    <ActivityIndicator size='medium' />
                </View>
            )}

            {/* <View
                style={{
                    // flex: 1,
                    height: '100%',
                    width: '100%',
                    zIndex: 10,
                }}
            > */}
                <Image
                    onLayout={onLayout}
                    source={{ uri: preview.uri }}
                    resizeMode='contain'
                    style={{
                        flex: 1,
                        alignItems: 'stretch',
                        zIndex: 10,
                    }}
                />

            {/* </View> */}

        </View>
    )
}

export default ImagePreview
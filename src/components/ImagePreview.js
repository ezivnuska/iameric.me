import React, { useState } from 'react'
import { Image, View } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'


const ImagePreview = ({ preview, width, height, uploading }) => {

    const [imageLoaded, setImageLoaded] = useState(false)

    const onLayout = () => {
        setImageLoaded(true)
    }

    return preview && (
        <View
            style={{
                flex: 1,
                width,
                height,
                // flexDirection: 'row',
                // alignItems: 'center',
                position: 'relative',
            }}
        >
            {!imageLoaded && (
                <View
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        zIndex: 100,
                    }}
                >
                    <View
                        style={{
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            background: (uploading &&`rgba(0, 0, 0, 0.3)`),
                        }}
                    >
                        <ActivityIndicator size='small' />
                    </View>
                </View>
            )}

            <Image
                onLayout={onLayout}
                source={{ uri: preview.uri }}
                resizeMode='contain'
                style={{
                    // height: preview.height,
                    // width: preview.width,
                    height: '100%',
                    width: '100%',
                    zIndex: 10,
                }}
            />

        </View>
    )
}

export default ImagePreview
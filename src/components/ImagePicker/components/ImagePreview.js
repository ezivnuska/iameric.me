import React, { useState } from 'react'
import { Pressable, View } from 'react-native'
import { ActivityIndicator, IconButton, ImageClone } from '@components'

const ImagePreview = ({ uri, height, width, progress, upload, uploading }) => {

    const [imageLoaded, setImageLoaded] = useState(false)

    const onLayout = () => {
        setImageLoaded(true)
    }

    return (
        <Pressable
            onPress={upload}
            disabled={!imageLoaded || uploading}
            style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                flexGrow: 1,
                position: 'relative',
                backgroundColor: 'rgba(0, 0, 0, 0.9)',
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
                    }}
                >

                    <View
                        style={{
                            flex: 1,
                            // width: '100%',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            background: `rgba(0, 0, 0, ${uploading ? 0.8 : 0.5})`,
                        }}
                    >

                        {
                            uploading
                                ? (
                                    <ActivityIndicator
                                        size='medium'
                                        label={`Uploading...\nDo not close window.${progress ? `\n${progress}%` : ''}`}
                                        color='#fff'
                                    />
                                )
                                : (
                                    <IconButton
                                        name='cloud-upload'
                                        onPress={upload}
                                        size={40}
                                        color='#fff'
                                        transparent
                                    />
                                )
                        }

                    </View>

                </View>
            )}

            <ImageClone
                onLayout={onLayout}
                source={{ uri }}
                width={width}
                height={height}
                style={{
                    borderWidth: 1,
                    width,
                    height,
                    marginHorizontal: 'auto',
                    zIndex: 10,
                }}
            />

        </Pressable>
    )
}

export default ImagePreview
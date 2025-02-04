import React, { useState } from 'react'
import { Image, Pressable, View } from 'react-native'
import { ActivityIndicator, Card, IconButton } from 'react-native-paper'


const UploadPreview = ({ uri, height, width, progress, upload, uploading }) => {

    const [imageLoaded, setImageLoaded] = useState(false)

    const onLayout = () => {
        setImageLoaded(true)
    }

    return (
        <View
            style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                flexGrow: 1,
                position: 'relative',
                backgroundColor: 'rgba(0, 0, 0, 0.9)',
                borderWidth: 1, borderColor: 'yellow', borderStyle: 'dotted',
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
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            background: `rgba(0, 0, 0, ${uploading ? 0.8 : 0.5})`,
                        }}
                    >

                        {uploading ? (
                            <ActivityIndicator size='medium' />
                        ) : (
                            <View
                                style={{
                                    padding: 20,
                                    borderRadius: '50%',
                                    background: 'rgba(0, 155, 0, 0.8)',
                                }}
                            >
                                <IconButton
                                    icon='cloud-upload'
                                    onPress={upload}
                                    size={50}
                                />

                            </View>
                        )}

                    </View>

                </View>
            )}

            <View
                style={{
                    height,
                    width,
                    marginHorizontal: 'auto',
                    zIndex: 10,
                }}
            >
                <Image
                    onLayout={onLayout}
                    source={{ uri }}
                    resizeMode='contain'
                    style={{
                        flex: 1,
                        alignSelf: 'stretch',
                    }}
                />
            </View>

        </View>
    )
}

export default UploadPreview
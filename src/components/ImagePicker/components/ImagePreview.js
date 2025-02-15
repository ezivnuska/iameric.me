import React, { useState } from 'react'
import { Image, Pressable, View } from 'react-native'
import { ActivityIndicator, IconButton } from 'react-native-paper'


const ImagePreview = ({ uri, height, width, progress, upload, uploading }) => {

    const [imageLoaded, setImageLoaded] = useState(false)

    const onLayout = () => {
        setImageLoaded(true)
    }

    return (
        <View
            // onPress={upload}
            // disabled={!imageLoaded || uploading}
            style={{
                flex: 1,
                position: 'relative',
                // backgroundColor: 'rgba(255, 0, 0, 0.9)',
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
                            // background: `rgba(0, 0, 0, ${uploading ? 0.8 : 0.3})`,
                            padding: 20,
                            borderRadius: '50%',
                            background: 'rgba(0, 155, 0, 0.8)',
                        }}
                    >

                        {uploading ? (
                            <ActivityIndicator size='medium' />
                        ) : (
                            <IconButton
                                icon='cloud-upload'
                                onPress={upload}
                                size={50}
                            />
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
                    // width={width}
                    // height={height}
                    resizeMode='contain'
                    style={{
                        flex: 1,
                        // alignSelf: 'stretch',
                        // height,
                        // width,
                        // marginHorizontal: 'auto',
                        // zIndex: 10,
                    }}
                />
            </View>
            {/* <ImageClone
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
            /> */}

        </View>
    )
}

export default ImagePreview
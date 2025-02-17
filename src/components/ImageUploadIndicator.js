import React from 'react'
import { Image, View } from 'react-native'
import { useUser } from '@context'
import { ActivityIndicator } from 'react-native-paper'

const ImageUploadIndicator = props => {

    const { uploading } = useUser()

    const shadow = {
        shadowColor: '#000',
        shadowOffset: {
            width: 3,
            height: 3,
        },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 3,
    }

    return uploading?.uri && (
        <View
            style={[
                {
                    position: 'absolute',
                    bottom: 50,
                    left: 10,
                },
                props.style,
            ]}
        >
            <View
                style={[{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'relative',
                    borderRadius: 10,
                    overflow: 'hidden',
                }, shadow]}
            >

                <View
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'rgba(255, 255, 255, 0.5)',
                        zIndex: 100,
                    }}
                />

                <View
                    style={{
                        position: 'absolute',
                        top: 0, right: 0, left: 0, bottom: 0,
                        zIndex: 1000,
                    }}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <ActivityIndicator size='small' color='white' />
                    </View>


                </View>

                <Image
                    source={{ uri: uploading.uri }}
                    // source={`${IMAGE_PATH}/avatar-default.png`}// used for testing locally
                    width={72}
                    height={72}
                    resizeMode='cover'
                    style={{
                        height: 72,
                        width: 72,
                        zIndex: 10,
                    }}
                />

            </View>

        </View>
    )
}

export default ImageUploadIndicator
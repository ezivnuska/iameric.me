import React from 'react'
import {
    View,
    Image,
} from 'react-native'
// import { ThumbListItem } from './components'
import { DefaultText } from '@components'
import { IMAGE_PATH } from '@config'

const ThumbList = ({ children, images, bipId = null, disabled = false, small = false }) => {

    const assetPath = process.env.IMAGE_PATH || IMAGE_PATH
    
    const imageSize = small ? 30 : 50
    
    if (!images || !images.length) return null

    return (
        <View
            style={{
                // flex: 1,
                position: 'relative',
                height: imageSize,
                width: imageSize,
            }}
        >
            <View
                style={{
                    width: imageSize,
                    height: imageSize,
                    backgroundColor: '#000',
                    borderWidth: 1,
                }}
            >
                <Image
                    width={imageSize}
                    height={imageSize}
                    source={{ uri: `${assetPath}/${images[0].path}/${images[0].filename}` }}
                    resizeMode='cover'
                    style={[
                        {
                            width: imageSize,
                            height: imageSize,
                            opacity: 0.75,
                        },
                    ]}
                />
            </View>

            
            <View
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    zIndex: 1000,
                    width: imageSize,
                    height: imageSize,
                }}
            >
                <View
                    style={{
                        width: imageSize,
                        height: imageSize,
                    }}
                >
                    <View
                        style={{
                            flex: 1,
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginHorizontal: 'auto',
                        }}
                    >
                        {children
                            ? children
                            : (
                                <DefaultText
                                    size={imageSize * 0.6}
                                    color='#fff'
                                    align='center'
                                    bold
                                    style={{
                                        lineHeight: imageSize,
                                    }}
                                >
                                    {images.length}
                                </DefaultText>
                            )
                        }
                    </View>
                </View>
            </View>

            {/* {children
                ? (
                    <View
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            zIndex: 1000,
                            width: imageSize,
                            height: imageSize,
                        }}
                    >
                        {children}
                    </View>
                )
                : (
                    <DefaultText
                        size={imageSize * 0.6}
                        color='#fff'
                        align='center'
                        bold
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            zIndex: 1000,
                            width: imageSize,
                            lineHeight: imageSize,
                        }}
                    >
                        {images.length}
                    </DefaultText>
                )
            } */}

        </View>
    )
}

export default ThumbList
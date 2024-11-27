import React, { useEffect, useState } from 'react'
import { Pressable, View } from 'react-native'
import { ImageListItem } from './components'
import { ActivityIndicator } from '@components'
import { useApp } from '@app'
import Icon from 'react-native-vector-icons/Ionicons'

const ImageList = ({ images, onPress, uploading = null, upload = false }) => {

    const { theme } = useApp()

    const numImagesPerRow = 1
    const imageGap = 0

    const [maxWidth, setMaxWidth] = useState(null)

    const onLayout = e => {
		if (e.nativeEvent.target.offsetParent) {
			setMaxWidth(e.nativeEvent.target.offsetParent.clientWidth)
		}
	}

    // useEffect(() => {
    //     if (maxWidth) {
    //         setScale((maxWidth - (imageGap * (numImagesPerRow - 1)) - numImagesPerRow * 2) / numImagesPerRow)
    //     }
    // }, [maxWidth])

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
            onLayout={onLayout}
            style={{
                // flexDirection: 'row',
                // flexWrap: 'wrap',
                gap: imageGap,
                width: '100%',
                marginVertical: 7,
            }}
        >
            {(maxWidth && images)
                ? images.map((image, index) => (
                    <Pressable
                        key={`image-${index}`}
                        onPress={() => onPress('SHOWCASE', image)}
                        style={[
                            // {
                            //     width: image.width * (image.width / maxWidth),
                            //     height: image.height * (image.width / maxWidth),
                            // },
                            buttonStyle,
                        ]}
                    >
                        <ImageListItem image={image} scale={maxWidth / image.width} />
                    </Pressable>
                ))
                : <ActivityIndicator size='medium' />
            }
            
            {upload && (
                <Pressable
                    key={`image-${images.length + (uploading ? 1 : 0)}`}
                    onPress={upload}
                    style={[
                        {
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: maxWidth,
                            height: maxWidth,
                        },
                        buttonStyle,
                    ]}
                >
                    <Icon
                        name='add-outline'
                        size={32}
                        color={theme?.colors.textDefault}
                    />

                </Pressable>
            )}

        </View>
    )
}

export default ImageList
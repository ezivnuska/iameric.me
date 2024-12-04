import React, { useMemo, useState } from 'react'
import { Pressable, View } from 'react-native'
import { ImageGridItem, ImageListItem } from './components'
import { ActivityIndicator } from '@components'
import { useApp } from '@app'

const ImageList = ({ images, onPress, list = false, uploading = null, upload = false }) => {

    const { theme } = useApp()

    const numImagesPerRow = list ? 1 : 2
    const imageGap = useMemo(() => list ? 20 : 5, [list])

    const [maxWidth, setMaxWidth] = useState(null)

    const imageSize = useMemo(() => maxWidth && (maxWidth - (imageGap * (numImagesPerRow - 1)) - numImagesPerRow * 2) / numImagesPerRow)

    const onLayout = e => {
		if (e.nativeEvent.target.offsetParent) {
			setMaxWidth(e.nativeEvent.target.offsetParent.clientWidth)
		}
	}

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
        >
            {imageSize ? (
                <View
                    style={{
                        flexDirection: !list ? 'row' : 'col',
                        flexWrap: !list ? 'wrap' : 'no-wrap',
                        gap: imageGap,
                        width: '100%',
                        marginVertical: 7,
                    }}
                >   
                    {images.map((image, index) => (
                        <Pressable
                            key={`image-${index}`}
                            onPress={() => onPress('SHOWCASE', image)}
                            style={[
                                {
                                    width: !list ? imageSize : 'auto',
                                    height: !list ? imageSize : 'auto',
                                },
                                buttonStyle,
                            ]}
                        >
                            {!list
                                ? <ImageGridItem image={image} size={imageSize} />
                                : <ImageListItem image={image} scale={maxWidth / image.width} />
                            }
                        </Pressable>
                    ))}
                </View>
            ) : <ActivityIndicator size='medium' />}

        </View>
    )
}

export default ImageList
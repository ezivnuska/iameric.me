import React, { useEffect, useRef, useState } from 'react'
import {
    Pressable,
    View,
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { useApp } from '@app'
import { useModal } from '@modal'
import { ImageListItem } from './components'

export default ImageList = ({ images, loading, upload = null }) => {

    const { theme } = useApp()
    
    const { setModal } = useModal()

    const imageGap = 0

    const containerRef = useRef(null)

    const numImagesPerRow = 4
    const [imageSize, setImageSize] = useState(0)

    useEffect(() => {
        if (containerRef) {
            setImageSize(containerRef.current.clientWidth / numImagesPerRow)
        }
    }, [containerRef])

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
            ref={containerRef}
            style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                gap: imageGap,
            }}
        >
            {images.map((image, index) => (
                <Pressable
                    key={`image-${index}`}
                    onPress={() => setModal('SHOWCASE', image)}
                    style={[
                        {
                            width: imageSize,
                            height: imageSize,
                        },
                        buttonStyle,
                    ]}
                >
                    <ImageListItem image={image} size={imageSize} />
                </Pressable>
            ))}
            
            {upload && (
                <Pressable
                    key={`image-${images.length + (loading ? 1 : 0)}`}
                    onPress={upload}
                    style={[
                        {
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: imageSize,
                            height: imageSize,
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
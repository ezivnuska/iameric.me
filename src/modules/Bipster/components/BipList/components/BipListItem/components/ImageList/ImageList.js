import React, { useEffect, useRef, useState } from 'react'
import {
    Pressable,
    View,
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { useApp } from '@app'
import { useModal } from '@modal'
import { ImageListItem, UploadImage } from './components'

// const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'

export default ImageList = ({ images, bipId = null, disabled = false, small = false }) => {

    const { dims, theme, user } = useApp()
    
    const { setModal } = useModal()

    const imageGap = 4

    const containerRef = useRef(null)

    const numImagesPerRow = small ? 10 : 8

    const [imageSize, setImageSize] = useState(0)

    useEffect(() => {
        if (containerRef) {
            setImageSize((containerRef.current.clientWidth - (imageGap * (numImagesPerRow - 1)) - numImagesPerRow * 2) / numImagesPerRow)
        }
    }, [dims])

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
                width: '100%',
            }}
        >
            {images ? images.map((image, index) => (
                <ImageListItem
                    path={`${image.path}/${image.filename}`}
                    size={imageSize}
                    key={`bip-image-${index}`}
                />        
            )) : null}

        </View>
    )
}
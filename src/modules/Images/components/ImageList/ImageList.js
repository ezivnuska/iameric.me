import React, { useEffect, useState } from 'react'
import {
    Image,
    Pressable,
    View,
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { useApp } from '@app'
import { useImages } from '@images'
import { useModal } from '@modal'
import { ActivityIndicator } from 'react-native-paper'
import { ImageListItem } from './components'

const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'

export default ImageList = ({ images, loading, restricted = false }) => {

    const {
        dims,
        theme,
        user,
    } = useApp()
    
    const { setModal } = useModal()

    const imageGap = 5

    const numImagesPerRow = 4
    const [imageSize, setImageSize] = useState((dims.width - (20 + numImagesPerRow * (imageGap - 1))) / numImagesPerRow)

    useEffect(() => {
        if (dims) {
            let dimWidth = dims.width
            if (dimWidth > 400) dimWidth = 400
            setImageSize((dimWidth - (numImagesPerRow * (imageGap - 1))) / numImagesPerRow)
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

    const isDev = process.env.NODE_ENV === 'development'
    
    const restrictUpload = () => (loading || isDev)

    const hideUpload = () => {
        return false// temp
        if (!user || restricted) return true
        switch(user.username) {
            case 'Customer':
            case 'Driver':
            case 'Vendor':
                return true
            default:
                return false
        }
    }

    const handleUpload = () => {
        if (restrictUpload()) alert(`can't upload in dev mode`)
        else setModal('IMAGE')
    }
    
    return (
        <View
            style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'space-between',
                flexWrap: 'wrap',
                gap: imageGap,
                width: '100%',
            }}
        >
            {images.map((image, index) => (
                <Pressable
                    key={`image-${index}`}
                    onPress={() => setModal('SHOWCASE', image)}
                    // disabled={loading}
                    style={[
                        {
                            flexBasis: 'auto',
                            width: imageSize,
                            height: imageSize,
                        },
                        // buttonStyle,
                    ]}
                >
                    <ImageListItem image={image} size={imageSize} />
                </Pressable>
            ))}
        </View>
    )
}
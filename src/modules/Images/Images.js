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

const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'

export default ({ restricted = false }) => {

    const {
        dims,
        profile,
        theme,
    } = useApp()
    const { images, uploading } = useImages()
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
    
    const restrictUpload = () => (uploading || isDev)

    const hideUpload = () => {
        return false// temp
        if (!profile || restricted) return true
        switch(profile.username) {
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
        else setModal('SELECT_IMAGE')
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
            {images && images.map((image, index) => {
                return image.user ? (
                    <Pressable
                        key={`image-${index}`}
                        onPress={() => setModal('IMAGE', image)}
                        disabled={uploading}
                        style={[
                            {
                                flexBasis: 'auto',
                                width: imageSize,
                                height: imageSize,
                            },
                            buttonStyle,
                        ]}
                    >
                        <Image
                            width={imageSize}
                            height={imageSize}
                            source={{ uri: `${IMAGE_PATH}/${image.user.username}/thumb/${image.filename}` }}
                            style={{
                                resizeMode: 'cover',
                                width: '100%',
                                height: '100%',
                            }}
                        />
                    </Pressable>

                ) : null
            })}

            {uploading && (
                <View
                    key={`image-${images.length}`}
                    style={[
                        {
                            flexBasis: 'auto',
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: imageSize,
                            height: imageSize,
                        },
                        buttonStyle,
                    ]}
                >
                    <ActivityIndicator />
                </View>
            )}

            {!hideUpload() && (
                <Pressable
                    key={`image-${images.length + (uploading ? 1 : 0)}`}
                    onPress={handleUpload}
                    style={[
                        {
                            flexBasis: 'auto',
                            display: 'flex',
                            flexDirection: 'row',
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
import React, { useEffect, useState } from 'react'
import {
    EmptyStatus,
    Image,
    Pressable,
    View,
} from 'react-native'
import {
    useApp,
    useModal,
} from '@context'

const IMAGE_SIZE = 50
const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'

export default ({ images }) => {

    const { dims, theme } = useApp()
    const { setModal } = useModal()

    const imageGap = 5

    const numImagesPerRow = 4
    const [imageSize, setImageSize] = useState((dims.width - (20 + numImagesPerRow * (imageGap - 1))) / numImagesPerRow)

    useEffect(() => {
        if (dims) setImageSize((dims.width - (20 + numImagesPerRow * (imageGap - 1))) / numImagesPerRow)
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
            {images.length ? (
                <View>
                    {images.map((image, index) => image.user ? (
                        <Pressable
                            key={`image-${index}`}
                            onPress={() => setModal('IMAGE', image)}
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
                    ) : null)}
                </View>
            ) : <EmptyStatus status='No images yet.' />}
            
        </View>
    )
}
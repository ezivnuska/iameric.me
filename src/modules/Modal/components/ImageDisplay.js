import React, { useEffect, useMemo, useState } from 'react'
import {
    Image,
    Pressable,
    View,
} from 'react-native'
import {
    SimpleButton,
    ThemedText,
} from '@components'
import { useApp } from '@app'
import { useImages } from '@images'
import { useModal } from '@modal'
import {
    deleteImage,
    getMaxImageDims,
} from '@utils/images'
import { ActivityIndicator } from 'react-native-paper'
import Icon from 'react-native-vector-icons/Ionicons'

const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'

export default ImageDisplay = ({ image }) => {
    const { dims, theme } = useApp()
    const {
        imagesLoading,
        removeImage,
        setImagesLoading,
    } = useImages()

    const { closeModal } = useModal()

    // const [imageDims, setImageDims] = useState(null)

    const imageDims = useMemo(() => getMaxImageDims(image.width, image.height, dims.width, dims.height - 100), [image])

    // useEffect(() => {
    //     // const imageSize = getMaxImageDims(image.width, image.height, dims)
    //     setImageDims(imageSize)
    // }, [])

    const handleDelete = async () => {
        setImagesLoading(true)
        const deletedImage = await deleteImage(image._id)
        setImagesLoading(false)

        if (deletedImage) {
            removeImage(deletedImage._id)
            closeModal()
        } else {
            console.log('could not delete image')
        }
    }

    return (
        <View
            style={{
                gap: 10,
            }}
        >
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <ThemedText>Image Preview</ThemedText>

                <Pressable
                    onPress={() => closeModal()}
                    style={{ flexGrow: 0 }}
                >
                    <Icon
                        name='close-outline'
                        size={24}
                        color={theme?.colors.textDefault}
                    />
                </Pressable>
            </View>

            <Image
                source={{
                    uri: `${IMAGE_PATH}/${image.user.username}/${image.filename}`,
                }}
                style={{
                    resizeMode: 'contain',
                    width: imageDims.width,
                    height: imageDims.height,
                    marginHorizontal: 'auto',
                }}
            />
            
            <SimpleButton
                label='Delete'
                onPress={handleDelete}
                disabled={imagesLoading}
            />

        </View>
    )
}
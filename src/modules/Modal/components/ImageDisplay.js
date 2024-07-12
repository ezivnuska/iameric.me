import React from 'react'
import {
    Image,
    Pressable,
    View,
} from 'react-native'
import { SimpleButton } from '@components'
// import { useApp } from '@app'
import { useImages } from '@images'
import { useModal } from '@modal'
import { deleteImage } from '@utils/images'

const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'

export default ImageDisplay = ({ image }) => {
    // const { user } = useApp()
    const {
        imagesLoading,
        removeImage,
        setImagesLoading,
    } = useImages()

    const { closeModal } = useModal()

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
        <View>

            <Pressable
                onPress={() => closeModal()}
            >
                <Image
                    source={{
                        uri: `${IMAGE_PATH}/${image.user.username}/thumb/${image.filename}`,
                    }}
                    style={{
                        resizeMode: 'contain',
                        height: image.height,
                        width: image.width,
                        marginHorizontal: 'auto',
                    }}
                />
            </Pressable>
            <SimpleButton
                label='Delete'
                onPress={handleDelete}
                disabled={imagesLoading}
            />
        </View>
    )
}
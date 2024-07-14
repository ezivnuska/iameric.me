import React, { useMemo } from 'react'
import {
    Image,
    View,
} from 'react-native'
import {
    IconButton,
    SimpleButton,
    ThemedText,
} from '@components'
import { useApp } from '@app'
import { useImages } from '@images'
import { useModal } from '@modal'
import {
    deleteImage,
    getMaxImageDims,
    setAvatar,
} from '@utils/images'

const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'

export default ImageDisplay = ({ image }) => {
    const {
        dims,
        setProfileImage,
        user,
    } = useApp()

    const {
        images,
        imagesLoading,
        removeImage,
        setImagesLoading,
    } = useImages()

    const {
        closeModal,
        setModal,
    } = useModal()

    const caption = useMemo(() => {
        const img = images.filter(i => i._id === image._id)[0]
        return img.caption
    }, [image, user])

    const imageDims = useMemo(() => getMaxImageDims(image.width, image.height, dims.width, dims.height - 100), [dims, image])

    const isProfileImage = useMemo(() => (user && user.profileImage && user.profileImage._id === image._id), [image, user])
    
    const handleDelete = async () => {

        if (process.env.NODE_ENV === 'development') return alert(`Can't delete in development`)

        setImagesLoading(true)
        const deletedImage = await deleteImage(image._id, isProfileImage)
        setImagesLoading(false)
        
        if (deletedImage) {
            if (isProfileImage) setProfileImage(null)
            removeImage(deletedImage._id)
            closeModal()
        } else {
            console.log('Error deleting image.')   
        }
    }

    const makeAvatar = async () => {

        setImagesLoading(true)
        const avatar = await setAvatar(user._id, image._id)
        setImagesLoading(false)
        
        if (avatar) setProfileImage(avatar)

        closeModal()
    }

    const removeAvatar = async () => {

        setImagesLoading(true)
        await setAvatar(user._id)
        setImagesLoading(false)
        
        setProfileImage(null)

        closeModal()
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
                <ThemedText style={{ flexGrow: 1 }}>Image Preview</ThemedText>

                <IconButton
                    name='close-outline'
                    onPress={() => closeModal()}
                    style={{ flexGrow: 0 }}
                />
            </View>

            <View>
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
                {caption && <ThemedText>{caption}</ThemedText>}
            </View>

            <SimpleButton
                label='Add Caption'
                onPress={() => setModal('CAPTION', image)}
                disabled={imagesLoading}
            />

            <SimpleButton
                label='Delete'
                onPress={handleDelete}
                disabled={imagesLoading}
            />

            {isProfileImage ? (
                <SimpleButton
                    label='Remove as Avatar'
                    onPress={removeAvatar}
                    disabled={imagesLoading}
                />
            ) : (
                <SimpleButton
                    label='Make Avatar'
                    onPress={makeAvatar}
                    disabled={imagesLoading}
                />
            )}

        </View>
    )
}
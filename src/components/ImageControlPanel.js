import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { Caption, IconButtonLarge } from '@components'
// import { Caption } from '@modules'
import { useImages } from '@images'
import { deleteImage, setAvatar } from '@utils/images'
import { useUser } from '@user'

const ImageControlPanel = props => {

    const {
        closeImagesModal,
        imagesLoading,
        removeImage,
        setImagesLoading,
    } = useImages()

    const {
        setProfileImage,
        user,
        userLoading,
        setUserLoading,
    } = useUser()

    const [image, setImage] = useState(props.image)
    const [isProfileImage, setIsProfileImage] = useState(null)

    useEffect(() => {
        if (image) setIsProfileImage(user.profileImage?._id === image?._id)
    }, [image])
    
    const handleDelete = async () => {

        if (process.env.NODE_ENV === 'development') return alert(`Can't delete in development`)

        setImagesLoading(true)
        const deletedImage = await deleteImage(image._id, isProfileImage)
        setImagesLoading(false)
        
        if (deletedImage) {
            removeImage(deletedImage._id)
            closeImagesModal()
        } else {
            console.log('Error deleting image.')   
        }
    }

    const makeAvatar = async () => {

        setUserLoading(true)
        const data = await setAvatar(user._id, image._id)
        setUserLoading(false)

        if (data && data.profileImage) {
            setProfileImage(data.profileImage)
    
            setIsProfileImage(true)
        }
    }

    const removeAvatar = async () => {

        setUserLoading(true)
        await setAvatar(user._id)
        setUserLoading(false)

        setProfileImage(null)

        setIsProfileImage(false)
    }

    return (
        <View
            style={{
                flexGrow: 0,
                flexShrink: 0,
                gap: 10,
                paddingHorizontal: 10,
                paddingVertical: 10,
            }}
        >
            <View
                style={{
                    flexDirection: 'row',
                    gap: 10,
                }}
            >
                <IconButtonLarge
                    name={'happy-sharp'}
                    size={32}
                    color={isProfileImage ? 'tomato' : null}
                    onPress={isProfileImage ? removeAvatar : makeAvatar}
                    disabled={userLoading}
                    transparent={isProfileImage}
                />

                <IconButtonLarge
                    name='trash-sharp'
                    size={32}
                    color='red'
                    onPress={handleDelete}
                    disabled={imagesLoading}
                    transparent
                />
            </View>
        
            <Caption data={image} />
        </View>
    )
}

export default ImageControlPanel
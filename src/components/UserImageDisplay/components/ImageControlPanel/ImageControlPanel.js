import React, { useEffect, useMemo, useState } from 'react'
import { View } from 'react-native'
import {
    Caption,
} from './components'
import {
    IconButton,
    IconButtonLarge,
    Time,
} from '@components'
import { useImages } from '@images'
import { deleteImage, setAvatar } from './utils'
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
    const [active, setActive] = useState(null)

    useEffect(() => {
        if (image) setIsProfileImage(user.profileImage?._id === image?._id)
    }, [image])

    useEffect(() => {
        if (image) setIsProfileImage(user.profileImage?._id === image?._id)
    }, [active])
    
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

    const handleAvatar = () => {
        if (active) setActive(null)
        if (isProfileImage) removeAvatar()
        else makeAvatar()
    }

    const renderTimeDisplay = () => {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: 10,
                }}
            >
                <Time
                    time={image.createdAt}
                    color='#fff'
                    prefix='Uploaded '
                />

                <IconButton
                    name='trash-outline'
                    size={24}
                    color='#fff'
                    onPress={handleDelete}
                    disabled={imagesLoading || active}
                />
                
            </View>
        )
    }

    const renderProfileOption = () => {
        return (
            <IconButtonLarge
                label={`${!isProfileImage ? 'make' : 'remove'} profile image`}
                name='happy-sharp'
                size={32}
                color='#fff'
                onPress={handleAvatar}
                disabled={userLoading || active}
                transparent
            />
        )
    }

    return (
        <View
            style={{
                flex: 1,
                // flexBasis: 'auto',
                // flexGrow: 1,
                // flexShrink: 0,
                gap: 10,
                paddingHorizontal: 10,
                paddingVertical: 10,
            }}
        >
        
            <Caption
                data={image}
                onChange={setActive}
                active={active === 'caption'}
            />

            {renderTimeDisplay()}

            {renderProfileOption()}

        </View>
    )
}

export default ImageControlPanel
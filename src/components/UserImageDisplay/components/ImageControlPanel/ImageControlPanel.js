import React, { useMemo, useState } from 'react'
import { View } from 'react-native'
import { Caption } from './components'
import {
    IconButton,
    IconButtonLarge,
    ProfileImage,
    ThemedText,
    Time,
} from '@components'
import { useImages } from '@images'
import { useUser } from '@user'
import { setAvatar } from './utils'
import { deleteImage } from '@utils/images'

const ImageControlPanel = ({ image, onClose }) => {

    const {
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

    const [active, setActive] = useState(null)
    
    const loading = useMemo(() => userLoading || imagesLoading, [userLoading, imagesLoading])
    const profileImage = useMemo(() => user && user.profileImage, [user])
    const isProfileImage = useMemo(() => profileImage && profileImage._id === image._id, [profileImage])
    
    const handleDelete = async () => {

        if (process.env.NODE_ENV === 'development') return alert(`Can't delete in development`)

        setImagesLoading(true)
        const deletedImage = await deleteImage(image._id, isProfileImage)
        setImagesLoading(false)

        if (!deletedImage) console.log('Error deleting image.')
        else {
            if (isProfileImage) setProfileImage(null)
            removeImage(deletedImage._id)
            onClose()
        }
    }

    const makeAvatar = async () => {

        setUserLoading(true)
        const data = await setAvatar(user._id, image._id)
        setUserLoading(false)

        if (data && data.profileImage) {
            setProfileImage(data.profileImage)
        }
    }

    const removeAvatar = async () => {

        setUserLoading(true)
        await setAvatar(user._id)
        setUserLoading(false)

        setProfileImage(null)
    }

    const handleAvatar = () => {
        if (active) setActive(null)
        if (isProfileImage) removeAvatar()
        else makeAvatar()
    }

    const renderProfileOption = () => {
        return (
            <IconButtonLarge
                label={`${!isProfileImage ? 'make' : 'remove'} profile image`}
                name='happy-sharp'
                size={32}
                color='#fff'
                onPress={handleAvatar}
                disabled={imagesLoading || active}
                transparent
            />
        )
    }

    return (
        <View
            style={{
                flex: 1,
                gap: 10,
                height: '50%',
                paddingHorizontal: 10,
                paddingVertical: 10,
            }}
        >
            
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'flex-end',
                    gap: 10,
                }}
            >
                <ProfileImage
                    user={user}
                    size={50}
                />

                <View style={{ flexGrow: 1 }}>
                    <ThemedText
                        size={20}
                        color='#fff'
                        bold
                        style={{ lineHeight: 25 }}
                    >
                        {user.username}
                    </ThemedText>

                    <Time
                        time={image.createdAt}
                        color='#fff'
                        prefix='Uploaded '
                        style={{ lineHeight: 25 }}
                    />
                </View>

                <IconButton
                    name='trash-outline'
                    size={24}
                    color='#fff'
                    onPress={handleDelete}
                    disabled={imagesLoading}
                />

            </View>
        
            <Caption
                data={image}
                onChange={setActive}
                active={active === 'caption'}
            />

            {renderProfileOption()}

        </View>
    )
}

export default ImageControlPanel
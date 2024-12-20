import React, { useMemo, useState } from 'react'
import { View } from 'react-native'
import { Caption } from './components'
import { IconButton, IconButtonLarge } from '@components'
import { useUser } from '@context'
import { setAvatar } from './utils'
import { deleteImage } from '@utils/images'

const ImageControlPanel = ({ image, onClose }) => {
    
    const {
        imagesLoading,
        user,
        removeImage,
        setImagesLoading,
        setProfileImage,
        setUserLoading,
        updateUser,
    } = useUser()

    const [active, setActive] = useState(null)
    
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

            removeImage(image.user._id, deletedImage._id)

            onClose()
        }
    }

    const makeAvatar = async () => {

        setUserLoading(true)
        const data = await setAvatar(user._id, image._id)
        setUserLoading(false)

        if (data && data.profileImage) {
            setProfileImage(data.profileImage)
            updateUser({ profileImage: data.profileImage })
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

    return (
        <View
            style={{
                flex: 1,
                gap: 10,
                paddingVertical: 10,
                // background: 'orange',
            }}
        >
        
            <Caption
                data={image}
                onCancel={onClose}
                onChange={setActive}
                active={active === 'caption'}
            />

            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: 10,
                }}
            >
                <IconButtonLarge
                    label={`${!isProfileImage ? 'make' : 'remove'} profile image`}
                    name='happy-sharp'
                    size={32}
                    color='#fff'
                    onPress={handleAvatar}
                    disabled={imagesLoading || active}
                    transparent
                />

                <IconButton
                    name='trash-outline'
                    size={24}
                    color='#fff'
                    onPress={handleDelete}
                    disabled={imagesLoading || active}
                />
            </View>

        </View>
    )
}

export default ImageControlPanel
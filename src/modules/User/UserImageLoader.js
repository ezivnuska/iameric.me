import React, { useEffect, useMemo, useState } from 'react'
import { View } from 'react-native'
import {
    ActivityIndicator,
    IconButton,
    ImageContainer,
    ModalHeader,
    SetAvatarButton,
} from '@components'
import { useUser } from '@user'
import {
    deleteImage,
    loadImage,
    setAvatar,
} from './utils'

const UserImageLoader = ({ data }) => {
    
    const {
        closeUserModal,
        setProfileImage,
        user,
        userLoading,
        removeImage,
        setUserLoading,
        setUserModal,
    } = useUser()

    const [image, setImage] = useState(null)
    const isProfileImage = useMemo(() => user.profileImage?._id === image?._id, [user, image])

    const init = async id => {
        setUserLoading(true)
        const image = await loadImage(id)
        setUserLoading(false)
        if (image) setImage(image)
    }

    useEffect(() => {
        if (data) init(data._id)
    }, [])
    
    const handleDelete = async () => {

        if (process.env.NODE_ENV === 'development') return alert(`Can't delete in development`)

        setUserLoading(true)
        const deletedImage = await deleteImage(image._id, isProfileImage)
        setUserLoading(false)
        
        if (deletedImage) {
            removeImage(deletedImage._id)
            closeUserModal()
        } else {
            console.log('Error deleting image.')   
        }
    }

    const makeAvatar = async () => {

        setUserLoading(true)
        const avatar = await setAvatar(user._id, image._id)
        setUserLoading(false)

        setProfileImage(avatar)
    }

    const removeAvatar = async () => {

        setUserLoading(true)
        await setAvatar(user._id)
        setUserLoading(false)

        setProfileImage(null)
    }

    const handleAvatar = () => {
        if (isProfileImage) removeAvatar()
        else makeAvatar()
    }

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: '#fff',
                paddingHorizontal: 10,
            }}
        >

            <ModalHeader
                title={image?.caption || 'Image Preview'}
                onClose={closeUserModal}
            >
                <IconButton
                    name='create-outline'
                    onPress={() => setUserModal('CAPTION', image)}
                    disabled={!image}
                    size={20}
                />
            </ModalHeader>
            
            <View
                style={{
                    flexDirection: 'row',
                    gap: 10,
                }}
            >
                <View
                    style={{
                        flexGrow: 1,
                        flexShrink: 1,
                    }}
                >
                    {
                        image
                        ? <ImageContainer image={image} />
                        : <ActivityIndicator />
                    }

                </View>

                <View
                    style={{
                        flexGrow: 0,
                        flexShrink: 0,
                        gap: 10,
                    }}
                >

                    <SetAvatarButton
                        user={user}
                        image={image}
                        isAvatar={isProfileImage}
                        loading={userLoading}
                        onPress={handleAvatar}
                    />

                    {/* <IconButton
                        name={'image-sharp'}
                        color={isProfileImage ? 'red' : null}
                        onPress={isProfileImage ? removeAvatar : makeAvatar}
                        disabled={userLoading}
                        style={{ padding: 3 }}
                    /> */}

                    <IconButton
                        name='trash-sharp'
                        onPress={handleDelete}
                        disabled={userLoading}
                        style={{ padding: 3 }}
                    />
                    
                </View>

            </View>
        </View>
    )
}

export default UserImageLoader
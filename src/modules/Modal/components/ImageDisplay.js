import React, { useEffect, useRef, useState, useMemo } from 'react'
import {
    Image,
    View,
} from 'react-native'
import { ModalHeader } from '.'
import { IconButton } from '@components'
import { useApp } from '@app'
import { useImages } from '@images'
import { useModal } from '@modal'
import {
    deleteImage,
    getMaxImageDims,
    loadImage,
    setAvatar,
} from '@utils/images'
import { ActivityIndicator } from 'react-native-paper'

const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'

export default ({ data }) => {

    const containerRef = useRef()

    const {
        dims,
        setProfileImage,
        user,
    } = useApp()

    const {
        getImage,
        imagesLoading,
        removeImage,
        setImagesLoading,
    } = useImages()

    const {
        closeModal,
        setModal,
    } = useModal()

    const [image, setImage] = useState(null)
    const [imageDims, setImageDims] = useState(null)
    const [isProfileImage, setIsProfileImage] = useState(false)

    const userImage = useMemo(() => getImage(data._id), [data])

    useEffect(() => {
        
        const loadContactImage = async () => {
            const img = await loadImage(data._id)
            setImage(img)
        }

        if (userImage) setImage(userImage)
        else loadContactImage()
    }, [])

    useEffect(() => {
        if (userImage) setImage(userImage)
    }, [userImage])

    const getImageDims = () => {
        if (!image) return null
        const maxWidth = containerRef.current.clientWidth
        setImageDims(getMaxImageDims(image.width, image.height, maxWidth))
    }

    useEffect(() => {
        if (image && user._id === image.user._id) {
            const imageIsProfileImage = user.profileImage && user.profileImage._id === image._id
            setIsProfileImage(imageIsProfileImage)
        }
        getImageDims()
    }, [image])

    useEffect(() => {
        getImageDims()
    }, [dims])
    
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
        
        if (avatar) setProfileImage(avatar.profileImage)

        closeModal()
    }

    const removeAvatar = async () => {

        setImagesLoading(true)
        await setAvatar(user._id)
        setImagesLoading(false)
        
        setProfileImage(null)

        closeModal()
    }

    if (!image) return <ActivityIndicator size='small' />

    return (
        <View>

            <ModalHeader title={image && image.caption || 'Image Preview'}>
                {userImage && (
                    <IconButton
                        name='create-outline'
                        onPress={() => setModal('CAPTION', image)}
                        size={20}
                    />
                )}
            </ModalHeader>
            
            <View
                style={{
                    flexDirection: 'row',
                    gap: 10,
                }}
            >
                <View
                    ref={containerRef}
                    style={{
                        flexGrow: 1,
                        flexShrink: 1,
                    }}
                >
                    {image && imageDims && (
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
                    )}
                </View>

                {userImage && (
                    <View
                        style={{
                            flexGrow: 0,
                            flexShrink: 0,
                            gap: 10,
                        }}
                    >

                        <IconButton
                            name={'image-sharp'}
                            onPress={isProfileImage ? removeAvatar : makeAvatar}
                            disabled={imagesLoading}
                            style={{ padding: 3 }}
                        />

                        <IconButton
                            name='trash-sharp'
                            onPress={handleDelete}
                            disabled={imagesLoading}
                            style={{ padding: 3 }}
                        />
                        
                    </View>
                )}

            </View>

        </View>
    )
}
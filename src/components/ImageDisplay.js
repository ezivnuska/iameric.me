import React, { useEffect, useRef, useState, useMemo } from 'react'
import {
    Image,
    View,
} from 'react-native'
import {
    ActivityIndicator,
    IconButton,
    ImageContainer,
    ModalHeader,
} from '@components'
import { useApp } from '@app'
import { useImages } from '@images'
import { useModal } from '@modal'
import { useUser } from '@user'
import {
    deleteImage,
    getMaxImageDims,
    loadImage,
    setAvatar,
} from '@utils/images'

const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'

export default ({ data }) => {

    const containerRef = useRef()

    const {
        dims,
        setProfileImage,
    } = useApp()

    const {
        user,
    } = useUser()

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

    const userImage = useMemo(() => data ? getImage(data._id) : null, [data])

    useEffect(() => {
        
        const loadContactImage = async () => {
            const loadedImage = await loadImage(data._id)
            setImage(loadedImage)
        }

        if (userImage) setImage(userImage)
        else if (data) loadContactImage()
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

    return (
        <View style={{ flex: 1 }}>
            
            {image ? (
                <View style={{ flex: 1 }}>

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

                        {image && <ImageContainer image={image} />}
                        {/* <View
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
                                    resizeMode='contain'
                                    style={{
                                        width: imageDims.width,
                                        height: imageDims.height,
                                        marginHorizontal: 'auto',
                                    }}
                                />
                            )}
                        </View> */}

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
            ) : <ActivityIndicator />}

        </View>
    )
}
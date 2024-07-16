import React, { useEffect, useRef, useState, useMemo } from 'react'
import {
    Image,
    View,
} from 'react-native'
import { ModalHeader } from '.'
import {
    IconButton,
    SimpleButton,
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

    const containerRef = useRef()

    const {
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

    const [imageDims, setImageDims] = useState(null)
    
    const isProfileImage = useMemo(() => (user && user.profileImage && user.profileImage._id === image._id), [image, user])

    useEffect(() => {
        // if (containerRef.current) {
            const maxWidth = containerRef.current.clientWidth
            setImageDims(getMaxImageDims(image.width, image.height, maxWidth))
        // }

    }, [containerRef])

    const caption = useMemo(() => {
        const img = images.filter(i => i._id === image._id)[0]
        return img.caption
    }, [image, user])

    
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
        <View>

            <ModalHeader title={caption || 'Image Preview'}>
                <IconButton
                    name='create-outline'
                    onPress={() => setModal('CAPTION', image)}
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
                    ref={containerRef}
                    style={{ flexGrow: 1 }}
                >
                    {imageDims && (
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

                <View
                    style={{
                        flexGrow: 0,
                        justifyContent: 'space-evenly',
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

            </View>

        </View>
    )
}
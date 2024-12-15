import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import ImageDisplayView from './ImageDisplayView'
import { ActivityIndicator } from '@components'
import { useModal, useUser } from '@context'
import { deleteImage, loadImage } from '@utils/images'

const ImageDisplayContainer = ({ data }) => {

    const { closeModal } = useModal()
    const {
        user,
        userDetails,
        removeImage,
        updateUser,
    } = useUser()

    const [imageLoading, setImageLoading] = useState(false)
    const [image, setImage] = useState(null)

    useEffect(() => {
        if (data) init(data._id)
    }, [])
    
    const init = async id => {
        
        setImageLoading(true)
        const loadedImage = await loadImage(id)
        setImageLoading(false)
        
        if (loadedImage) {
            setImage(loadedImage)
        }
    }
    
    const onDelete = async () => {

        if (process.env.NODE_ENV === 'development') return alert(`Can't delete in development`)
        if (!image) return console.log('no image data to delete')

        const isProfileImage = image.user.profileImage && image.user.profileImage._id === image._id

        setImageLoading(true)
        const deletedImage = await deleteImage(image._id, isProfileImage)
        setImageLoading(false)

        if (!deletedImage) console.log('Error deleting image.')
        else {
            removeImage(userDetails._id, deletedImage._id)

            if (isProfileImage) updateUser({ ...userDetails, profileImage: null })

            onClose()
        }
    }

    return (
        <View style={{ flex: 1 }}>
            {imageLoading
                ? <ActivityIndicator label='Loading image...' size='medium' />
                : image?.user
                    ? (
                        <View
                            key={`image-display-${Date.now()}`}
                            style={{
                                flex: 1,
                                flexGrow: 1,
                            }}
                        >
                            <ImageDisplayView
                                disabled={imageLoading}
                                image={image}
                                onClose={closeModal}
                                onDelete={onDelete}
                                owner={user._id === data.user?._id}
                            />
                        </View>
                    )
                    : null
            }
        
        </View> 
    )
}

export default ImageDisplayContainer
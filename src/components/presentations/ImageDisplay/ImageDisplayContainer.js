import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import ImageDisplayView from './ImageDisplayView'
import { ActivityIndicator } from '@components'
import { useModal, useUser } from '@context'
import { getImageOwner, deleteImage, loadImage } from '@utils/images'

const ImageDisplayContainer = ({ data }) => {

    const { closeModal } = useModal()
    const {
        getUser,
        user,
        userDetails,
        removeImage,
        updateUser,
    } = useUser()

    const [imageLoading, setImageLoading] = useState(false)
    const [ownerLoading, setOwnerLoading] = useState(false)
    const [image, setImage] = useState(data)

    const fetchOwner = async imageId => {

        setOwnerLoading(true)
        const owner = await getImageOwner(imageId)
        setOwnerLoading(false)

        if (owner) {
            console.log('found image owner after searching', Object.keys(owner))
            setImage({ ...image, user: owner })
        } else {
            console.log(`could not find owner for image id ${imageId}`)
        }
    }

    useEffect(() => {
        if (data) {
            const savedUser = getUser(data.user._id)
            if (savedUser) {
                console.log('owner details available.')
                const newImage = { ...image, user: savedUser }
                console.log('newImage', newImage)
                setImage(newImage)
            } else {
                console.log('could not find owner details. looking now...')
                fetchOwner(data._id)
            }
        }
        
        // if (data && typeof data === 'string') init(data)
    }, [])
    
    const init = async id => {

        console.log('loading image with data', data)
        
        setImageLoading(true)
        const loadedImage = await loadImage(id)
        setImageLoading(false)

        console.log('loaded image', loadedImage)
        
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
                : image
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
                                admin={user.role === 'admin'}
                            />
                        </View>
                    )
                    : null
            }
        
        </View> 
    )
}

export default ImageDisplayContainer
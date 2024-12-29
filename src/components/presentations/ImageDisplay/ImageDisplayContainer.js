import React, { useEffect, useMemo, useState } from 'react'
import ImageDisplayView from './ImageDisplayView'
import { ActivityIndicator } from '@components'
import { useModal, useUser } from '@context'
import { deleteImage } from '@utils/images'

const ImageDisplayContainer = ({ data }) => {

    const { closeModal } = useModal()
    
    const {
        imageLoading,
        imagesLoading,
        user,
        fetchImageAndUpdate,
        findUserImage,
        removeImage,
        setImageLoading,
        updateUser,
        findUserById,
    } = useUser()

    const [image, setImage] = useState(null)
    
    const owner = useMemo(() => data.image.user, [data])

    const init = async data => {

        let currentImage = await fetchImageAndUpdate(data.image._id)
            
        if (currentImage) setImage(currentImage)
    }

    useEffect(() => {
        if (data) init(data)
    }, [])

    useEffect(() => {
        if (owner) updateUser(owner)
    }, [owner])
    
    const onDelete = async () => {

        if (process.env.NODE_ENV === 'development') return alert(`Can't delete in development`)
        if (!image) return console.log('no image data to delete')

        const isProfileImage = owner.profileImage?._id === image._id

        setImageLoading(true)
        const deletedImage = await deleteImage(image._id, isProfileImage)
        setImageLoading(false)

        if (!deletedImage) console.log('Error deleting image.')
        else {
            removeImage(owner._id, deletedImage._id)

            if (isProfileImage) updateUser({ ...owner, profileImage: null })

            onClose()
        }
    }

    const update = updatedUser => {
        setImage({
            ...image,
            user: updatedUser,
        })
        updateUser(updatedUser)
    }

    return imageLoading
        ? <ActivityIndicator label='Loading...' size='medium' />
        : image
            ? (
                <ImageDisplayView
                    disabled={imagesLoading}
                    image={image}
                    // owner={owner}
                    onClose={closeModal}
                    onDelete={onDelete}
                    update={update}
                />
            )
            : <ActivityIndicator label='...' size='medium' />
}

export default ImageDisplayContainer
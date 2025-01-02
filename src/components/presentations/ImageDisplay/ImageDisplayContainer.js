import React, { useEffect, useMemo, useState } from 'react'
import ImageDisplayView from './ImageDisplayView'
import { ActivityIndicator } from '@components'
import { useModal, useUser } from '@context'
import { deleteImage, loadImage, setAvatar, setCaption } from '@utils/images'

const ImageDisplayContainer = ({ data }) => {

    const { closeModal } = useModal()
    
    const {
        imageLoading,
        imagesLoading,
        user,
        removeImage,
        updateImage,
        updateUser,
        fetchImageAndUpdate,
        findUserById,
    } = useUser()

    const [image, setImage] = useState(null)
    const [owner, setOwner] = useState(null)
    const [loading, setLoading] = useState(false)
    
    const isProfileImage = useMemo(() => owner?.profileImage?._id === image?._id, [image, owner])
    
    const initOwner = async userId => {
        let imageOwner = await findUserById(userId)
        if (imageOwner) setOwner(imageOwner)
    }

    const init = async data => {
        let currentImage = data
        
        let imageData = await fetchImageAndUpdate(data._id)

        if (imageData) currentImage = imageData
        else {
            imageData = await loadImage(data._id)
            
            if (imageData) currentImage = imageData
        }
        
        setImage(currentImage)
    }

    useEffect(() => {
        if (data) init(data)
    }, [])
    
    useEffect(() => {
        
        if (image) { 
            initOwner(image.user._id)
            updateImage(image)
        }
        
    }, [image])
    
    useEffect(() => {
        if (owner) updateUser(owner)
    }, [owner])

    const onDelete = async () => {
    
        if (process.env.NODE_ENV === 'development') return alert(`Can't delete in development`)

        setLoading(true)
        const deletedImage = await deleteImage(image._id, isProfileImage)
        setLoading(false)

        if (!deletedImage) console.log('Error deleting image.')
        else {

            removeImage(owner._id, deletedImage._id)

            if (user._id === owner?._id && isProfileImage) {
                setOwner({ ...owner, profileImage: null })
            }

            onClose()
        }
    }
    
    const onChangeAvatar = async () => {

        const newAvatarId = user.profileImage?._id !== image._id ? image._id : null

        setLoading(true)
        const profileImage = await setAvatar(user._id, newAvatarId)
        setLoading(false)

        setOwner({ ...owner, profileImage })
        
    }
    
    const onCaptionEdit = async caption => {
        
        setImage({ ...image, caption })

    }

    return imageLoading
        ? <ActivityIndicator label='Loading...' size='medium' />
        : owner
            ? (
                <ImageDisplayView
                    disabled={imagesLoading}
                    image={image}
                    owner={owner}
                    onClose={closeModal}
                    onDelete={onDelete}
                    onChangeAvatar={onChangeAvatar}
                    onCaptionEdit={onCaptionEdit}
                    // update={update}
                />
            )
            : <ActivityIndicator label='Loading image owner...' size='medium' />
}

export default ImageDisplayContainer
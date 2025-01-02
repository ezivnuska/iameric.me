import React, { useEffect, useState } from 'react'
import ImageDisplayView from './ImageDisplayView'
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
        }
        
    }, [image])

    const onDelete = async () => {
    
        if (process.env.NODE_ENV === 'development') return alert(`Can't delete in development`)

        setLoading(true)
        const response = await deleteImage(data._id, owner.profileImage?._id === data._id)
        
        const { deletedImage, modifiedUser } = response
        setLoading(false)

        if (deletedImage) {
            
            let updatedOwner = null

            if (modifiedUser) {
                
                const images = owner.images.filter(img => img._id !== deletedImage._id)
                updatedOwner = {
                    ...modifiedUser,
                    images,
                }
                updateUser(updatedOwner)
                setOwner(updatedOwner)
            }

            removeImage(owner._id, deletedImage._id)
            closeModal()

        } else {

            console.log('Error deleting image.')
        }

    }
    
    const onChangeAvatar = async () => {

        const newAvatarId = user.profileImage?._id !== image._id ? image._id : null

        setLoading(true)
        const profileImage = await setAvatar(user._id, newAvatarId)
        setLoading(false)

        const newOwner = { ...owner, profileImage }

        setOwner(newOwner)
        updateUser(newOwner)
        
    }
    
    const onCaptionEdit = async caption => {
        
        setImage({ ...image, caption })

        closeModal()
    }

    return owner
        ? (
            <ImageDisplayView
                disabled={loading}
                image={image}
                imageLoading={loading}
                owner={owner}
                onClose={closeModal}
                onDelete={onDelete}
                onChangeAvatar={onChangeAvatar}
                onCaptionEdit={onCaptionEdit}
                // update={update}
            />
        ) : null
}

export default ImageDisplayContainer
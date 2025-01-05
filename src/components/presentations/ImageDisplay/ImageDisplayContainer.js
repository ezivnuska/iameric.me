import React, { useEffect, useState } from 'react'
import ImageDisplayView from './ImageDisplayView'
import { useModal, useUser } from '@context'
import { deleteImage, loadImage, setAvatar } from '@utils/images'
import { loadContactById } from '@utils/contacts'

const ImageDisplayContainer = ({ data }) => {

    const { closeModal } = useModal()
    
    const {
        user,
        updateImage,
        updateUser,
        findUserById,
        setDeletedImage,
    } = useUser()

    const [image, setImage] = useState(null)
    const [owner, setOwner] = useState(null)
    const [loading, setLoading] = useState(false)

    const init = async imageId => {
        setLoading(true)
        let loadedImage = await loadImage(imageId)
        setLoading(false)
        
        if (loadedImage) {
            setImage(loadedImage)
        }
    }

    useEffect(() => {
        init(data._id)
    }, [])

    useEffect(() => {
        if (owner) updateImage(image)
    }, [owner])

    const loadImageOwner = async ownerId => {

        let imageOwner = findUserById(ownerId)
        
        if (!imageOwner) {
            imageOwner = await loadContactById(ownerId)
        }

        if (imageOwner) {
            updateUser(imageOwner)
            setOwner(imageOwner)
        }
    }

    useEffect(() => {
        if (image) {
            loadImageOwner(image.user._id)
        }
        
    }, [image])

    const onDelete = async () => {
    
        if (process.env.NODE_ENV === 'development') return alert(`Can't delete in development`)

        setLoading(true)
        const response = await deleteImage(data._id, owner.profileImage?._id === data._id)
        
        setLoading(false)

        if (response.deletedImage) {
            
            setDeletedImage(response.deletedImage)
            
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
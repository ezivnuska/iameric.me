import React, { useEffect, useMemo, useState } from 'react'
import ImageDisplayView from './ImageDisplayView'
import { useModal, useUser } from '@context'
import { deleteImage, loadImage, setAvatar } from '@utils/images'
import { loadContactById } from '@utils/contacts'

const ImageDisplayContainer = ({ data }) => {

    const { closeModal } = useModal()
    
    const {
        authUser,
        getProfile,
        updateImage,
        updateUser,
        findUserById,
        findUserImage,
        setDeletedImage,
        setProfileImage,
    } = useUser()

    const [image, setImage] = useState(null)
    const [owner, setOwner] = useState(null)
    const [loading, setLoading] = useState(false)

    // const profile = useMemo(() => owner && getProfile(owner._id), [owner])

    const init = async imageId => {
        setLoading(true)
        let loadedImage = await loadImage(imageId)
        setLoading(false)
        
        if (loadedImage) {
            setImage(loadedImage)
        }
    }

    useEffect(() => {
        console.log('INIT ImageDisplayContainer:data', data)
        console.log('string or object?')
        init(data._id || data)
    }, [])

    useEffect(() => {
        console.log(' ')
        console.log('owner changed', owner)
        console.log(' ')
    }, [owner])

    const loadImageOwner = async ownerId => {

        let imageOwner = findUserById(ownerId)
        
        if (!imageOwner) {
            imageOwner = await loadContactById(ownerId)

            if (imageOwner) {
                console.log('Image owner is freshly loaded; updating in state', imageOwner)
                updateUser(imageOwner)
            }
        }

        if (imageOwner) {
            console.log('setting image owner', imageOwner)
            setOwner(imageOwner)
        }
    }

    useEffect(() => {
        console.log('image changed', image)
        if (image) {
            if (!owner || owner._id !== image.user._id) {
                loadImageOwner(image.user._id)
            }
        }
        
    }, [image])

    const onDelete = async () => {
    
        if (process.env.NODE_ENV === 'development') return alert(`Can't delete in development`)

        setLoading(true)
        const response = await deleteImage(data, owner.profileImage?._id === data)
        
        setLoading(false)

        if (response.deletedImage) {
            
            setDeletedImage(response.deletedImage)
            
            closeModal()

        } else {

            console.log('Error deleting image.')
        }

    }
    
    const onChangeAvatar = async (image = null) => {
        console.log('image for new avatar', image)
        setLoading(true)
        const profileImage = await setAvatar(authUser._id, image?._id)
        setLoading(false)

        const newOwner = { ...owner, profileImage }
        console.log(' ')
        console.log('setAvatar:profileImage', profileImage)
        console.log('setAvatar:newOwner', newOwner)
        console.log(' ')
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
import React, { useEffect, useMemo, useState } from 'react'
import ImageDisplayView from './ImageDisplayView'
import { ActivityIndicator } from '@components'
import { useModal, useUser } from '@context'
import { deleteImage, loadImage } from '@utils/images'

const ImageDisplayContainer = ({ data }) => {

    // const {
    //     getContactImage,
    //     // updateContactImages,
    // } = useContacts()

    const { closeModal } = useModal()
    
    const {
        imageLoading,
        imagesLoading,
        user,
        fetchImageAndUpdate,
        findUserById,
        findUserImage,
        removeImage,
        setImageLoading,
        updateUser,
    } = useUser()

    const [image, setImage] = useState(null)

    const author = useMemo(() => findUserById(data.user._id), [data])
    // const images = useMemo(() => author && author.images, [author])
    // const image = useMemo(() => findUserImage(data.user._id, data._id), [data])

    const init = async () => {
        const image = await fetchImageAndUpdate(data._id)
        if (image) setImage(image)
    }

    useEffect(() => {
        if (author) {
            let userImage = findUserImage(data._id, author.images)
            if (!userImage) init()
            else setImage(userImage)
        }
    }, [])

    // useEffect(() => {
    //     console.log('author', author)
    // }, [author])

    // useEffect(() => {
    //     console.log('images', images?.length)
    //     if (images && !image) fetchImageAndUpdate(data._id)
    // }, [images])

    // useEffect(() => {
    //     console.log('image', image)
    // }, [image])
    
    const onDelete = async () => {

        if (process.env.NODE_ENV === 'development') return alert(`Can't delete in development`)
        if (!image) return console.log('no image data to delete')

        const isProfileImage = author.profileImage && author.profileImage._id === image._id

        setImageLoading(true)
        const deletedImage = await deleteImage(image._id, isProfileImage)
        setImageLoading(false)

        if (!deletedImage) console.log('Error deleting image.')
        else {
            removeImage(author._id, deletedImage._id)

            if (isProfileImage) updateUser({ ...user, profileImage: null })

            onClose()
        }
    }

    return imageLoading
        ? <ActivityIndicator label='Loading...' size='medium' />
        : image
            ? (
                <ImageDisplayView
                    disabled={imagesLoading}
                    image={image}
                    author={author}
                    onClose={closeModal}
                    onDelete={onDelete}
                />
            )
            : <ActivityIndicator label='...' size='medium' />
}

export default ImageDisplayContainer
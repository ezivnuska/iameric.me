import React from 'react'
import { useFeed, useModal, useSocket, useUser } from '@context'
import { uploadImage } from '@utils/images'
import { createPost } from '@utils/feed'
import PostFormView from './PostFormView'

const PostFormContainer = ({ data }) => {

    const fields = [
        {
            name: 'text',
            placeholder: 'share something...',
            multiline: true,
        },
    ]

    const { addPost } = useFeed()
    const { closeModal } = useModal()
    const { socket } = useSocket()
    const { setUploading } = useUser()

    const handleUpload = async data => {
        
        if (process.env.NODE_ENV === 'development') return alert('can\'t upload in dev')
        
        setUploading(true)
        const image = await uploadImage({ ...data })
        setUploading(false)
        
        if (image) return image
        else {
            console.log('error uploading image')
            return null
        }
    }

    const handleSubmit = async (data, imageData) => {
        
        let postData = { ...data }
        let image = null

        if (imageData) {
            image = await handleUpload({ ...imageData })
            console.log('image', image)
            
            if (image) {
                postData = {
                    ...postData,
                    images: [image._id],
                }
            }
        }
        
        console.log('postData', postData)

        const post = await createPost(postData)

        if (post) {
            addPost(post)
            socket.emit('new_post', post)
        }

        closeModal()
    }

    return (
        <PostFormView
            fields={fields}
            onCancel={closeModal}
            onSubmit={handleSubmit}
        />
    )
}

export default PostFormContainer
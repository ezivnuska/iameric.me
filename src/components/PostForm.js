import React, { useState } from 'react'
import { Card, IconButton } from 'react-native-paper'
import { Form } from '@components'
import { useFeed, useModal, useSocket, useUser } from '@context'
import { uploadImage } from '@utils/images'
import { createPost } from '@utils/feed'

const PostForm = ({ data = null }) => {

    const fields = [
        {
            name: 'text',
            placeholder: 'share something...',
            multiline: true,
        },
    ]

    const { updatePost, closeFeedModal } = useFeed()
    const { closeModal } = useModal()
    const { socket } = useSocket()
    const { setUploading } = useUser()

    const [imageData, setImageData] = useState(null)

    const handleUpload = async uploadData => {
        
        if (process.env.NODE_ENV === 'development') return alert('can\'t upload in dev')
        
        setUploading(true)
        const image = await uploadImage({ ...uploadData })
        setUploading(false)
        
        if (image) return image
        else {
            console.log('error uploading image')
            return null
        }
    }

    const handleSubmit = async formData => {
        
        let postData = { ...formData }
        let image = null

        if (imageData) {
            image = await handleUpload({ ...imageData })
            
            if (image) {
                postData = {
                    ...postData,
                    images: [image._id],
                }
            }
        }
        
        // console.log('postData', postData)

        const post = await createPost(postData)

        if (post) {
            updatePost(post)
            socket.emit('new_post', post)
        }

        closeModal()
    }

    return (
        <Card>

            <Card.Title
                title='Report Bug'
                titleVariant='headlineLarge'
                right={() => <IconButton icon='close-thick' onPress={closeModal} />}
            />
            
            <Card>

                <Card.Title
                    title='Tell us what happened'
                    titleVariant='headlineSmall'
                    subtitle='Please describe the bug.'
                    subtitleVariant='bodyLarge'
                />

                <Card.Content style={{ marginTop: 10 }}>
                    <Form
                        title='Say Something'
                        fields={fields}
                        onCancel={closeModal}
                        onSubmit={handleSubmit}
                    />
                </Card.Content>
            </Card>
        </Card>
    )
}

export default PostForm
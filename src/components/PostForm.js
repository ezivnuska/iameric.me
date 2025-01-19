import React, { useState } from 'react'
import { View } from 'react-native'
import { Form, ImagePickerMini } from '@components'
import { useFeed, useSocket, useUser } from '@context'
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

        closeFeedModal()
    }

    return (
        <View
            style={{
                // flexGrow: 1,
                gap: 10,
            }}
        >
            <Form
                title='Add Post'
                fields={fields}
                onCancel={closeFeedModal}
                onSubmit={handleSubmit}
            />
            
            <ImagePickerMini onSelection={setImageData} />
        </View>
    )
}

export default PostForm
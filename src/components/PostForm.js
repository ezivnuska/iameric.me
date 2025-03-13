import React from 'react'
import { View } from 'react-native'
import { Card } from 'react-native-paper'
import { Form, ModalHeader } from '@components'
import { useFeed, useForm, useModal, useSocket, useUser } from '@context'
import { createPost } from '@utils/feed'

const PostForm = ({ data = null }) => {

    const fields = [
        {
            name: 'text',
            placeholder: 'share something...',
            multiline: true,
        },
    ]

    const { updatePost } = useFeed()
    const { formError, formFields, resetForm, setFormError, setFormLoading } = useForm()
    const { closeModal } = useModal()
    const { socket } = useSocket()
    const { user } = useUser()

    const handleSubmit = async () => {

        const post = await createPost({
            ...formFields,
            postId: data._id,
            threadId: data.threadId,
            author: user._id,
        })

        if (post) {
            socket.emit('new_post', post)

            updatePost(post)
        }

        closeModal()
    }

    const submitFormData = async () => {
        
        if (formError) {
            console.log(`Error in form field ${formError.name}: ${formError.message}`)
            return
        }
         
        setFormLoading(true)
        const response = await handleSubmit()
        setFormLoading(false)
         
        if (response) {
            if (response.error) {
                setFormError(response)
            } else resetForm()
        }
    }

    return (
        <Card
            elevation={1}
            style={{
                marginVertical: '1.0%',
                marginHorizontal: 15,
            }}
        >
            <ModalHeader
                title='New Post'
            />

            <View
                style={{
                    flex: 1,
                }}
            >
                <Form
                    data={data}
                    fields={fields}
                    onCancel={closeModal}
                    onSubmit={submitFormData}
                />
            </View>
            
        </Card>
    )
}

export default PostForm
import React from 'react'
import { View } from 'react-native'
import { Card } from 'react-native-paper'
import { Form, ModalHeader } from '@components'
import { useFeed, useForm, useModal, useSocket, useUser } from '@context'
import { createPost } from '@utils/feed'
import ModalContainer from './ModalContainer'

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

    const handleSubmit = async formData => {

        const post = await createPost(formData)

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

        const formData = {
            author: user._id,
            ...formFields,
        }

        if (data) {
            formData = {
                ...formData,
                postId: data._id,
                threadId: data.threadId,
            }
        }
         
        setFormLoading(true)
        const response = await handleSubmit(formData)
        setFormLoading(false)
         
        if (response) {
            if (response.error) {
                setFormError(response)
            } else resetForm()
        }
    }

    return (
        <ModalContainer title='New Post'>
            <Form
                fields={fields}
                data={data}
                onSubmit={submitFormData}
            />
        </ModalContainer>
    )
}

export default PostForm
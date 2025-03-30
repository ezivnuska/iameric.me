import React from 'react'
import { ScrollView } from 'react-native'
import { IconButton, Text } from 'react-native-paper'
import { Form, Row, Stack } from '@components'
import { useFeed, useForm, useModal, useSocket, useUser } from '@context'
import { Size } from '@utils/stack'
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
            postId: data?._id,
            threadId: data?.threadId,
            ...formFields,
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
        <Stack
            flex={1}
        >
            <Row
                padding={[Size.XS, Size.XS, Size.None, Size.M]}
                align='center'
            >
                <Text
                    variant='headlineSmall'
                    style={{ flex: 1 }}
                >
                    New Post
                </Text>

                <IconButton
                    icon='close-thick'
                    onPress={closeModal}
                    style={{ margin: 0, padding: 0 }}
                />

            </Row>

            <ScrollView
                style={{
                    marginVertical: 0,
                }}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingBottom: Size.S,
                }}
            >
            
                <Stack
                    flex={1}
                    spacing={Size.M}
                    padding={[Size.S, Size.M]}
                >
                    <Form
                        fields={fields}
                        data={data}
                        onSubmit={submitFormData}
                    />
                </Stack>
            </ScrollView>
        </Stack>
    )
}

export default PostForm
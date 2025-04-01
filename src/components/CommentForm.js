import React from 'react'
import { ScrollView } from 'react-native'
import { IconButton, Text } from 'react-native-paper'
import { Form, Row, Stack } from '@components'
import { useFeed, useForm, useModal, useSocket, useUser } from '@context'
import { Size } from '@utils/stack'
import { createPost } from '@utils/feed'

const CommentForm = ({ data = null }) => {

    const fields = [
        {
            name: 'text',
            placeholder: 'add comment...',
            multiline: true,
        },
    ]

    const { addComment } = useFeed()
    const { formError, formFields, resetForm, setFormError, setFormLoading } = useForm()
    const { closeModal } = useModal()
    const { socket } = useSocket()

    const handleSubmit = async formData => {

        const comment = await createPost(formData)

        if (comment) {
            socket.emit('new_comment', comment)

            addComment(comment)
        }

        closeModal()
    }

    const submitFormData = async () => {
        
        if (formError) {
            console.log(`Error in form field ${formError.name}: ${formError.message}`)
            return
        }

        const formData = {
            ...formFields,
            author: data?.author,
            threadId: data?.threadId,
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
                    Add Comment
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

export default CommentForm
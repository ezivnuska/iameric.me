import React, { useState } from 'react'
import { ScrollView } from'react-native'
import { IconButton, Text } from'react-native-paper'
import { Form, Row, Stack } from '@components'
import { useBugs, useForm, useModal, useSocket, useUser } from '@context'
import { Size } from '@utils/stack'
import { createEntry } from '@utils/bugs'

const BugForm = () => {

    const { updateBug } = useBugs()
    const { formFields } = useForm()
    const { closeModal } = useModal()
    const { socket } = useSocket()
    const { user } = useUser()

    const [loading, setLoading] = useState(false)

    const fields = [
        {
            name: 'text',
            placeholder: 'Describe the error...',
            multiline: true,
        },
    ]

    const handleSubmit = async () => {

        setLoading(true)
        const bug = await createEntry({
            author: user._id,
            ...formFields,
        })
        setLoading(false)
        
        updateBug(bug)

        socket.emit('new_entry', bug)

        closeModal()

        return bug
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
                    Report Bug
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

                    <Text variant='titleLarge'>
                        What's the problem?
                    </Text>

                    <Form
                        fields={fields}
                        onSubmit={handleSubmit}
                    />
                </Stack>

            </ScrollView>

        </Stack>
    )
}

export default BugForm
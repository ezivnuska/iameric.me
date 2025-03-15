import React, { useState } from 'react'
import { Text } from 'react-native-paper'
import { Form, ModalContainer } from '@components'
import { useBugs, useForm, useModal, useSocket, useUser } from '@context'
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
        <ModalContainer title='Report Bug'>

            <Text variant='titleLarge'>
                What's the problem?
            </Text>

            <Form
                fields={fields}
                onSubmit={handleSubmit}
            />

        </ModalContainer>
    )
}

export default BugForm
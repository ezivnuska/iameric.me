import React, { useMemo } from 'react'
import { Text } from 'react-native-paper'
import { Form, ModalContainer } from '@components'
import { useForm, useUser } from '@context'
import { navigate } from '@utils/navigation'

const DestroyForm = () => {
    
    const { formFields } = useForm()
    const { user } = useUser()

    const condition = useMemo(() => formFields && user.username === formFields.destroy, [formFields])

    const fields = [
        {
            name: 'destroy',
            placeholder: 'username',
            multiline: false,
            requirements: [
                {
                    condition,
                    errorMessage: 'Invalid username.'
                },
            ],
        },
    ]

    return (
        <ModalContainer title='Delete Account'>

            <Text variant='titleMedium'>
                Confirm Username
            </Text>

            <Form
                fields={fields}
                onSubmit={() => navigate('Home', { destroy: true })}
            />

        </ModalContainer>
    )
}

export default DestroyForm
import React, { useMemo } from 'react'
import { ScrollView } from 'react-native'
import { IconButton, Text } from 'react-native-paper'
import { Form, Row, Stack } from '@components'
import { useForm, useModal, useUser } from '@context'
import { navigate } from '@utils/navigation'
import { Size } from '@utils/stack'

const DestroyForm = () => {
    
    const { formFields } = useForm()
    const { closeModal } = useModal()
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
                    Delete Account
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

                    <Text variant='titleMedium'>
                        Confirm Username
                    </Text>

                    <Form
                        fields={fields}
                        onSubmit={() => navigate('Home', { destroy: true })}
                    />

                </Stack>

            </ScrollView>

        </Stack>
    )
}

export default DestroyForm
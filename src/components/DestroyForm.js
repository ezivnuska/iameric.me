import React from 'react'
import { Card, IconButton } from 'react-native-paper'
import { Form } from '@components'
import { useModal } from '@context'
import { navigate } from '@utils/navigation'

const DestroyForm = () => {
    
    const { closeModal } = useModal()

    const fields = [
        {
            label: 'Enter Username',
            name: 'destroy',
            placeholder: 'username',
            multiline: false,
        },
    ]

    return (

        <Card>

            <Card.Title
                title='Delete Account'
                titleVariant='headlineLarge'
                right={() => <IconButton icon='close-thick' onPress={closeModal} />}
            />
            
            <Card elevation={0}>

                <Card.Title
                    title='Confirm Username'
                    titleVariant='headlineSmall'
                    subtitle='This action is irreversible.'
                    subtitleVariant='bodyLarge'
                />

                <Card.Content style={{ marginTop: 10 }}>
                    <Form
                        fields={fields}
                        onSubmit={() => navigate('Home', { destroy: true })}
                    />
                </Card.Content>

            </Card>

        </Card>
    )
}

export default DestroyForm
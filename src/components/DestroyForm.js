import React from 'react'
import { Card, IconButton } from 'react-native-paper'
import { Form } from '@components'
import { useModal } from '@context'
import { navigate } from '@utils/navigation'

const DestroyForm = () => {
    
    const { closeModal } = useModal()

    return (

        <Card>

            <Card.Title
                title='Delete Account'
                titleVariant='headlineLarge'
                right={() => <IconButton icon='close-thick' onPress={closeModal} />}
            />
            
            <Card>

                <Card.Title
                    title='Confirm Username'
                    titleVariant='headlineSmall'
                    subtitle='This action is irreversible.'
                    subtitleVariant='bodyLarge'
                />

                <Card.Content>
                    <Form
                        fields={[
                            {
                                label: 'Enter Username',
                                name: 'destroy',
                                placeholder: 'username',
                                multiline: false,
                            },
                        ]}
                        onSubmit={() => navigate('Home', { destroy: true })}
                    />
                </Card.Content>

            </Card>

        </Card>
    )
}

export default DestroyForm
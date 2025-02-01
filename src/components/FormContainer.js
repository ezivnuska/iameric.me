import React from 'react'
import { Button, Card, IconButton } from 'react-native-paper'
import { useModal } from '@context'

const FormContainer = ({ children, submit, title = '' }) => {
    const { closeModal } = useModal()
    return (
        <Card
            style={{
                flex: 1,
                maxWidth: '92%',
                marginHorizontal: 'auto',
            }}
        >

            <Card.Title
                title={title}
                right={() => <IconButton icon='close-thick' onPress={closeModal} />}
            />
            
            <Card.Content>
                {children}
            </Card.Content>

            <Card.Actions>
                <Button
                    onPress={submit}
                >
                    Submit
                </Button>
            </Card.Actions>
        </Card>
    )
}

export default FormContainer
import React from'react'
import { Card, Button, IconButton } from'react-native-paper'
import { useModal } from '@context'
import { navigate } from '@utils/navigation'

const Settings = () => {
    
    const { closeModal, setModal } = useModal()
    
    return (
        <Card>

            <Card.Title
                title='Settings'
                titleVariant='headlineLarge'
                right={() => <IconButton icon='close-thick' onPress={closeModal} />}
            />

            
            <Card elevation={0}>

                <Card.Title
                    title='Sign Out'
                    titleVariant='headlineSmall'
                    subtitle='Come back soon!'
                    subtitleVariant='bodyLarge'
                />

                <Card.Content>

                    <Button
                        mode='outlined'
                        onPress={() => navigate('Home', { signout: true })}
                        style={{ marginVertical: 10 }}
                    >
                        Sign Out
                    </Button>

                </Card.Content>

            </Card>

            <Card elevation={0}>
                
                <Card.Title
                    title='Close Account'
                    titleVariant='headlineSmall'
                    subtitle='Delete account and data.'
                    subtitleVariant='bodyLarge'
                />
                
                <Card.Content>

                    <Button
                        mode='outlined'
                        onPress={() => setModal('DESTROY')}
                        style={{ marginVertical: 10 }}
                    >
                        Close Account
                    </Button>

                </Card.Content>

            </Card>
        </Card>
    )
}

export default Settings
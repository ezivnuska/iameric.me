import React, { useState } from'react'
import { View } from'react-native'
import { Card, Button, IconButton } from'react-native-paper'
import { Cabinet, Form } from '@components'
import { useModal } from '@context'
import { navigate } from '@utils/navigation'

const Settings = () => {
    
    const { closeModal, setModal } = useModal()

    const initDestroy = () => navigate('Home', { destroy: true })
    const initSignout = () => navigate('Home', { signout: true })
    
    return (
        <Card>

            <Card.Title
                title='Settings'
                titleVariant='headlineLarge'
                right={() => <IconButton icon='close-thick' onPress={closeModal} />}
            />

            
            <Card>

                <Card.Title
                    title='Sign Out'
                    titleVariant='headlineSmall'
                    subtitle='Come back soon!'
                    subtitleVariant='bodyLarge'
                />

                <Card.Content>

                    <Button
                        mode='outlined'
                        onPress={initSignout}
                        style={{ marginVertical: 10 }}
                    >
                        Sign Out
                    </Button>

                </Card.Content>

            </Card>

            <Card>
                
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
    return (
        <View
            style={{
                gap: 10,
            }}
        >
            <Button
                mode='contained'
                onPress={initSignout}
            >
                Sign Out
            </Button>

            <Button
                mode='contained'
                onPress={() => setModal('DESTROY')}
            >
                Close Account
            </Button>
            
            {/* <Cabinet
                title='Close Account'
                transparent
                closed={closed}
            >
                <Form
                    fields={[
                        {
                            label: 'Enter Username',
                            name: 'destroy',
                            placeholder: 'username',
                            multiline: false,
                        },
                    ]}
                    onCancel={() => setClosed(true)}
                    onSubmit={initDestroy}
                />
            </Cabinet> */}
        </View>
    )
}

export default Settings
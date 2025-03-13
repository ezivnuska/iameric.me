import React from'react'
import { View } from'react-native'
import { Card, Button } from'react-native-paper'
import { ModalHeader } from'@components'
import { useModal } from '@context'
import { navigate } from '@utils/navigation'

const Settings = () => {
    
    const { addModal } = useModal()
    
    return (
         <Card
            elevation={1}
            style={{
                flex: 1,
                width: '100%',
                gap: 10,
            }}
        >

            <ModalHeader
                title='Settings'
            />
            
            <View
                style={{
                    flex: 1,
                    justifyContent: 'space-evenly',
                }}
            >
            
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
                            onPress={() => addModal('DESTROY')}
                            style={{ marginVertical: 10 }}
                        >
                            Close Account
                        </Button>

                    </Card.Content>

                </Card>
            </View>
        </Card>
    )
}

export default Settings
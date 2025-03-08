import React from'react'
import { View } from'react-native'
import { Card, Button, IconButton, Text } from'react-native-paper'
import { useModal } from '@context'
import { navigate } from '@utils/navigation'

const Settings = () => {
    
    const { closeModal, addModal } = useModal()
    
    return (
        <View
            style={{
                flex: 1,
                gap: 15,
                backgroundColor: theme.colors.background,
            }}
        >

            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingVertical: 5,
                }}
            >
                <Text
                    variant='headlineSmall'
                    style={{
                        flex: 1,
                        paddingHorizontal: 15,
                    }}
                >
                    Settings
                </Text>

                <IconButton
                    icon='close-thick'
                    onPress={closeModal}
                    style={{
                        margin: 0,
                        paddingHorizontal: 10,
                    }}
                />
            </View>
            
            <View
                style={{
                    flex: 1,
                    paddingHorizontal: 15,
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
        </View>
    )
}

export default Settings
import React from'react'
import { View } from'react-native'
import { Button, Text } from'react-native-paper'
import { useModal } from '@context'
import { navigate } from '@utils/navigation'
import ModalContainer from './ModalContainer'

const Settings = () => {
    
    const { addModal } = useModal()
    
    return (
        <ModalContainer title='Settings'>
            <View style={{ gap: 15 }}>

                <View style={{ gap: 15 }}>

                    <View style={{ gap: 10 }}>

                        <Text variant='titleLarge'>
                            Sign Out
                        </Text>

                        <Text variant='titleMedium'>
                            Come back soon!
                        </Text>

                    </View>

                    <Button
                        mode='outlined'
                        onPress={() => navigate('Home', { signout: true })}
                    >
                        Sign Out
                    </Button>

                </View>

                <View style={{ gap: 15 }}>
                    
                    <View style={{ gap: 10 }}>
                        
                        <Text variant='titleLarge'>
                            Close Account
                        </Text>

                        <Text variant='titleMedium'>
                            Delete account and data.
                        </Text>

                    </View>

                    <Button
                        mode='outlined'
                        onPress={() => addModal('DESTROY')}
                    >
                        Close Account
                    </Button>

                </View>

            </View>
        </ModalContainer>
    )
}

export default Settings
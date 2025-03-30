import React from'react'
import { ScrollView, View } from'react-native'
import { Button, IconButton, Text } from'react-native-paper'
import { useModal } from '@context'
import { navigate } from '@utils/navigation'
import { Size } from '@utils/stack'
import { Row, Stack } from '@components'

const Settings = () => {
    
    const { addModal, closeModal } = useModal()
    
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
                    Settings
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
                >
                    <Stack
                        spacing={Size.M}
                        padding={[Size.S, Size.M]}
                    >
                        <View style={{ gap: Size.XS }}>
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

                    </Stack>

                    <Stack
                        spacing={Size.M}
                        padding={[Size.S, Size.M]}
                    >
                        <View style={{ gap: Size.XS }}>
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

                    </Stack>
                
                </Stack>

            </ScrollView>

        </Stack>
    )
}

export default Settings
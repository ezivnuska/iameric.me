import React from'react'
import { View } from'react-native'
import { Button } from'react-native-paper'
import { Cabinet, Form, SimpleButton } from '@components'
import { navigate } from '@utils/navigation'

const Settings = () => (
    <View
        style={{
            gap: 10,
        }}
    >
        <Button
            mode='contained'
            onPress={() => navigate('Home', { signout: true })}
        >
            Sign Out
        </Button>

        <Cabinet
            title='Close Account'
            transparent
            closed
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
                onSubmit={() => navigate('Home', { destroy: true })}
            />
        </Cabinet>
    </View>
)

export default Settings
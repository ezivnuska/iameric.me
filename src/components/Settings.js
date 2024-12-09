import React from'react'
import { View } from'react-native'
import { Cabinet, Form, SimpleButton } from '.'
import { navigate } from '@utils/navigation'

const Settings = () => (
    <View
        style={{
            gap: 10,
        }}
    >
        <SimpleButton
            label={'Sign Out'}
            onPress={() => navigate('Home', { signout: true })}
        />

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
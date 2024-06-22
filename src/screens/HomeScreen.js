import React from 'react'
import { View } from 'react-native'
import {
    Screen,
    SimpleButton,
    ThemedText,
} from '@components'
import { useApp } from '@app'

export default ({ navigation }) => {

    const {
        token,
        setToken,
    } = useApp()
    
    return (
        <Screen title='Home'>
            
            <ThemedText>Welcome</ThemedText>

            <View style={{ paddingVertical: 20 }}>
                <FakeButton
                    label={token ? 'Sign Out' : 'Sign In'}
                    onPress={() => setToken(!token)}
                />
            </View>

            {token && (
                <SimpleButton
                    label='Another Screen'
                    onPress={() => navigation.navigate('Another')}
                />
            )}

        </Screen>
    )
}

const FakeButton = ({ label, onPress }) => {
    return (
        <SimpleButton
            label={label}
            onPress={onPress}
        />
    )
}
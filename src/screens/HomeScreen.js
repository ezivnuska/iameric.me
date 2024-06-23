import React from 'react'
import { View } from 'react-native'
import {
    Screen,
    SimpleButton,
    ThemedText,
} from '@components'
import { useApp } from '@app'

export default props => {
    // console.log('check out available props from navigation container...', props)
    // we are using the navigate method below.

    const { token } = useApp()
    
    return (
        <Screen
            {...props}
            secure={false}
            title='Home'
        >
            <View
                style={{
                    flexGrow: 1,
                    justifyContent: 'space-between',
                    gap: 20,
                }}
            >
                <View style={{ flexGrow: 1 }}>
                    <ThemedText>Welcome</ThemedText>
                </View>

                <View style={{ flexGrow: 0 }}>
                    <SimpleButton
                        label='Another Screen'
                        onPress={() => props.navigation.navigate('Another')}
                        disabled={!token}
                    />
                </View>
            </View>
            

        </Screen>
    )
}
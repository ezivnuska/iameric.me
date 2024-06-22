import React from 'react'
import {
    Screen,
    SimpleButton,
    ThemedText,
} from '@components'

export default ({ navigation }) => {
    
    return (
        <Screen title='Home'>
            <ThemedText>Welcome</ThemedText>
            <SimpleButton
                label='Another Screen'
                onPress={() => navigation.navigate('Another')}
            />
        </Screen>
    )
}
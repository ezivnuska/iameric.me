import React from 'react'
import {
    Screen,
    SimpleButton,
    ThemedText,
} from '@components'

export default ({ navigation }) => {
    
    return (
        <Screen title='Another Screen'>
            <ThemedText>You are here.</ThemedText>
            <SimpleButton
                label='Go Back'
                onPress={() => navigation.navigate('Home')}
            />
        </Screen>
    )
}
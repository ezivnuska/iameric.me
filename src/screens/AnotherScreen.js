import React from 'react'
import { View } from 'react-native'
import {
    Screen,
    SimpleButton,
    ThemedText,
} from '@components'

export default props => {
    
    return (
        <Screen title='Another Screen' {...props}>
            
            <View
                style={{
                    flexGrow: 1,
                    justifyContent: 'space-between',
                    gap: 20,
                }}
            >
                <View style={{ flexGrow: 1 }}>
                    <ThemedText>You are here.</ThemedText>
                </View>

                <View style={{ flexGrow: 0 }}>
                    <SimpleButton
                        label='Go Back'
                        onPress={() => props.navigation.navigate('Home')}
                    />
                </View>
            </View>

        </Screen>
    )
}
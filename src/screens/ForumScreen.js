import React from 'react'
import { View } from 'react-native'
import {
    Forum,
    Screen,
    SimpleButton,
} from '@components'

export default props => (
    <Screen
        {...props}
        title='Forum'
    >
        <View
            style={{
                flexGrow: 1,
                justifyContent: 'space-between',
                gap: 20,
            }}
        >
            <View style={{ flexGrow: 1 }}>
                <Forum />
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
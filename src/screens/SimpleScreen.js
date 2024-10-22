import React from 'react'
import { View } from 'react-native'
import { Screen } from './components'
import { Simple } from '@modules'

export default props => (
    <Screen
        {...props}
        secure={false}
    >
        <View style={{ flex: 1 }}>
            <Simple />
        </View>
    </Screen>
)
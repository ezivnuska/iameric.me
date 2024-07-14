import React from 'react'
import { View } from 'react-native'
import { Screen } from '@components'

export default props => (
    <Screen
        {...props}
        secure={false}
        title='Home'
    >
        <View style={{ flex: 1 }}>
            
        </View>

    </Screen>
)
import React from 'react'
import { View } from 'react-native'
import { Screen } from './components'
import { Contacts } from '@modules'

export default props => (
    <Screen {...props}>
        
        <View
            style={{
                flexGrow: 1,
                justifyContent: 'space-between',
                gap: 20,
            }}
        >
            <View style={{ flex: 1 }}>
                <Contacts {...props} />
            </View>

        </View>
        
    </Screen>
)
import React from 'react'
import { View } from 'react-native'
import { Screen } from '@components'
import { Contacts } from '@modules'

export default props => (
    <Screen
        {...props}
        title='Contacts'
    >
        
        <View
            style={{
                flexGrow: 1,
                justifyContent: 'space-between',
                gap: 20,
            }}
        >
            <View style={{ flexGrow: 1 }}>
                <Contacts />
            </View>

        </View>
        
    </Screen>
)
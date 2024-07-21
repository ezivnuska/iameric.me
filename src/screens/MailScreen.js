import React from 'react'
import { View } from 'react-native'
import { Screen } from './components'
import { Mail } from '@modules'

export default props => (
    <Screen {...props}>

        <View
            style={{
                flexGrow: 1,
                justifyContent: 'space-between',
                gap: 20,
            }}
        >

            <View style={{ flexGrow: 1 }}>

                <Mail />
                
            </View>

        </View>

    </Screen>
)
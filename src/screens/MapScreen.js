import React, { useEffect } from 'react'
import { View } from 'react-native'
import { Screen } from './components'
import { Heading } from '@components'
import { Map } from '@modules'

export default props => (
    <Screen {...props}>

        <View style={{ flex: 1 }}>

            <Heading
                title='Map'
                onBack={() => props.navigation.navigate('User', { screen: 'Profile' })}
            />
            
            <View style={{ flexGrow: 1 }}>
                <Map />
            </View>
        </View>

    </Screen>
)
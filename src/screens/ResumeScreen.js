import React from 'react'
import { View } from 'react-native'
import { Screen } from './components'
import { Heading } from '@components'
import { Resume } from '@modules'

export default props => (
    <Screen
        {...props}
        secure={false}
    >

        <View style={{ flex: 1 }}>
        
            <Heading
                title='Agency Experience'
                onBack={() => props.navigation.goBack()}
            />
            
            <Resume />

        </View>

    </Screen>
)
import React from 'react'
import { View } from 'react-native'
import {
    AboutNav,
    Screen,
} from './components'
import { Heading } from '@components'
import { Work } from '@modules'

export default props => (
    <Screen
        {...props}
        secure={false}
    >

        <View style={{ flex: 1 }}>

            <Heading
                title='About'
                onBack={() => props.navigation.navigate('Bips', { screen: 'BipList' })}
            >
                <AboutNav
                    type={'work'}
                    onPress={() => props.navigation.navigate('About', { screen: 'Play' })}
                />
            </Heading>

            <Work />

        </View>

    </Screen>
)
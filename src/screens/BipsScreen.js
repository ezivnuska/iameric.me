import React from 'react'
import { View } from 'react-native'
import { Screen } from './components'
import { Heading } from '@components'
import { Bipster } from '@modules'

export default props => {

    return (
        <Screen
            {...props}
            secure={true}
        >
    
            <View style={{ flex: 1 }}>
    
                <Heading
                    title='Bipster'
                    // onBack={() => props.navigation.navigate('Home')}
                />

                <View style={{ flex: 1 }}>
                    <Bipster />
                </View>
    
            </View>
    
        </Screen>
    )
}
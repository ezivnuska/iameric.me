import React from 'react'
import { View } from 'react-native'
import { Screen } from './components'
import { Heading } from '@components'
import { Bipster } from '@modules'
import { useBips } from '@bips'

export default props => {
    const { bips } = useBips()
    return (
        <Screen
            {...props}
            secure={true}
        >
    
            <View style={{ flex: 1 }}>
    
                <Heading
                    title={`Bipster - ${bips.length} bip${bips.length !== 0 ? 's' : ''}`}
                    // onBack={() => props.navigation.navigate('Home')}
                />

                <View style={{ flex: 1 }}>
                    <Bipster />
                </View>
    
            </View>
    
        </Screen>
    )
}
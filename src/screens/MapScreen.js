import React, { useEffect } from 'react'
import { View } from 'react-native'
import { Screen } from './components'
import { Heading } from '@components'
import { Map } from '@modules'

export default props => {

    return (
        <Screen {...props}>

            <View style={{ flex: 1 }}>

                <Heading
                    title='Map'
                    onBack={() => props.navigation.goBack()}
                />
                
                <View style={{ flexGrow: 1 }}>
                    <Map />
                </View>
            </View>

        </Screen>
    )
}
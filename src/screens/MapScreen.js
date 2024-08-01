import React, { useEffect } from 'react'
import { View } from 'react-native'
import { Screen } from './components'
import { Map, Resume } from '@modules'

export default props => {

    return (
        <Screen
            {...props}
            secure={false}
        >
            <View
                style={{
                    flex: 1,
                    height: '100%',
                    width: '100%',
                }}
            >
                <Map />
            </View>

        </Screen>
    )
}
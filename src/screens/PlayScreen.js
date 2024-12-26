import React from 'react'
import { View } from 'react-native'
import { Play, Screen } from '@components'
import { PlayContextProvider } from '@context'

const PlayScreen = props => (
    <Screen {...props}>
            
        <View style={{ flex: 1 }}>
            
            <PlayContextProvider>
                <Play />
            </PlayContextProvider>

        </View>

    </Screen>
)

export default PlayScreen
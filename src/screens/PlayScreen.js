import React from 'react'
import { View } from 'react-native'
import { Play, Screen } from '@components'
import { PlayContextProvider } from '@context'

const PlayScreen = props => {
    return (
        <Screen {...props}>
                
            <View style={{ flex: 1 }}>
                
                <PlayContextProvider>
                    <Play {...props} />
                </PlayContextProvider>

            </View>

        </Screen>
    )
}

export default PlayScreen
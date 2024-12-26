import React from 'react'
import { View } from 'react-native'
import { Play, Screen, TextHeading } from '@components'
import { PlayContextProvider } from '@context'

const PlayScreen = props => (
    <Screen {...props}>

        <View style={{ flex: 1 }}>

            <TextHeading>Play</TextHeading>
            
            <View
                style={{
                    flex: 1,
                    paddingHorizontal: 10
                }}
            >
                
                
                <PlayContextProvider>
                    <Play />
                </PlayContextProvider>

            </View>
        </View>

    </Screen>
)

export default PlayScreen
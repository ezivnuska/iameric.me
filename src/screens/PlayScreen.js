import React from 'react'
import { View } from 'react-native'
import { Screen } from './components'
import { ScreenHeader } from '@components'
import { Play } from '@modules'
import { PlayContextProvider } from '@play'

const PlayScreen = props => (
    <Screen {...props}>

        <View style={{ flex: 1 }}>

            <ScreenHeader label='Play' />
            
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
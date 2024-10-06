import React from 'react'
import { View } from 'react-native'
import { Tiles } from './games'
import { PlayContextProvider } from '@play'

export default () => (
    <PlayContextProvider>
        <View style={{ flex: 1, gap: 10 }}>
            <Tiles />
        </View>
    </PlayContextProvider>
)
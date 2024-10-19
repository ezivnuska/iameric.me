import React from 'react'
import { View } from 'react-native'
import { PlayContextProvider } from '.'
import { Tiles } from './games'

const Play = () => (
    <PlayContextProvider>
        <View style={{ flex: 1, gap: 10 }}>
            <Tiles />
        </View>
    </PlayContextProvider>
)

export default Play
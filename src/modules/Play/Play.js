import React from 'react'
import { View } from 'react-native'
import {
    Heading,
    ThemedText,
} from '@components'

export default () => (
    <View style={{ flex: 1 }}>
        <Heading title='Play' />
        <View>
            <ThemedText>Coming soon...</ThemedText>
        </View>
    </View>
)
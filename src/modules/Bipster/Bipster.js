import React from 'react'
import { View } from 'react-native'
import {
    Heading,
    ThemedText,
} from '@components'

export default () => {

    return (
        <View style={{ flex: 1 }}>
            <Heading title='Bipster' />
            <ThemedText>A work in progress.</ThemedText>
        </View>
    )
}
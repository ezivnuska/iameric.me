
import React from 'react'
import {
    Pressable,
} from 'react-native'
import { ThemedText } from '@components'

export default ({ label, onPress }) => {
    return (
        <Pressable
            onPress={onPress}
            style={{
                marginVertical: 10,
                paddingHorizontal: 10,
                paddingVertical: 5,
                background: 'tomato',
            }}
        >
            <ThemedText bold>{label}</ThemedText>
        </Pressable>
    )
}
import React from 'react'
import { Pressable } from 'react-native'
import { ThemedText } from '@components'

export default ({ text, onPress }) => (
    <Pressable
        onPress={onPress}
        style={{
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderRadius: 10,
            background: 'rgba(0, 200, 0, 0.8)',
        }}
    >
        <ThemedText bold color='#000'>{text}</ThemedText>
    </Pressable>
)
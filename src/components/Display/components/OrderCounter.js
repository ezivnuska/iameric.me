import React from 'react'
import {
    Pressable,
    View,
} from 'react-native'
import {
    ThemedText,
} from '@components'

export default ({ count, onPress }) => (
    <Pressable
        onPress={onPress}
        style={{
            flex: 1,
            alignItems: 'center',
            padding: 5,
            backgroundColor: 'tomato',
            borderRadius: 12,
        }}
        disabled={count < 1}
    >
        <ThemedText size={48} bold style={{ lineHeight: 48 }}>{`${count}`}</ThemedText>
        <ThemedText size={20} bold style={{ lineHeight: 20 }}>{`order${count !== 1 ? 's' : ''}`}</ThemedText>
    </Pressable>
)
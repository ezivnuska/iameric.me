import React from 'react'
import {
    View,
} from 'react-native'
import {
    ThemedText,
} from '@components'

export default ({ count }) => (
    <View
        style={{
            flex: 1,
            alignItems: 'center',
            padding: 5,
            backgroundColor: 'tomato',
            borderRadius: 12,
        }}
    >
        <ThemedText size={48} bold style={{ lineHeight: 48 }}>{`${count}`}</ThemedText>
        <ThemedText size={20} bold style={{ lineHeight: 20 }}>{`driver${count !== 1 ? 's' : ''}`}</ThemedText>
    </View>
)
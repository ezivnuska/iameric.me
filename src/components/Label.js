import React from 'react'
import {
    View,
} from 'react-native'
import {
    ThemedText,
} from '@components'

export default ({ children, label, visible = false }) => visible ? (
    <View
        style={{
            borderBottomWidth: 1,
            borderBottomColor: 'red',
        }}
    >
        <ThemedText
            style={{
                textAlign: 'center',
                lineHeight: 24,
                background: '#ccc',
            }}
        >
            {label}
        </ThemedText>
        <View>
            {children}
        </View>
    </View>
) : null
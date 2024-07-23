import React from 'react'
import { View } from 'react-native'
import { ThemedText } from '@components'

export default () => (
    <View
        style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
            marginBottom: 10,
        }}
    >
        <ThemedText bold size={20}>
            Contacts
        </ThemedText>

    </View>
)
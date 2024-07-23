import React from 'react'
import { View } from 'react-native'
import { ThemedText } from '@components'
import { MailNav } from './components'

export default () => (
    <View
        style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 10,
            marginBottom: 10,
        }}
    >
        <View style={{ flex: 1 }}>
            <ThemedText bold size={20}>Mail</ThemedText>
        </View>

        <View style={{ flex: 3 }}>
            <MailNav />
        </View>

    </View>
)
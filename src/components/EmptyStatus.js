import React from 'react'
import {
    ThemedText,
} from '@components'
import { View } from 'react-native'

export default ({ status }) => (
    <View
        style={{
            height: '100%',
            marginPadding: 10,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        }}
    >
        <ThemedText>
            {status}
        </ThemedText>
    </View>
)
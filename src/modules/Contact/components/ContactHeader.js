import React from 'react'
import { View } from 'react-native'
import { ThemedText } from '@components'

export default ({ children, title }) => (
    <View
        style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
            paddingBottom: 10,
        }}
    >
        <ThemedText bold size={20}>
            {title}
        </ThemedText>

        {children && children}

    </View>
)
import React from 'react'
import { View } from 'react-native'
import { ThemedText } from '@components'

export default ({ children, title }) => (
    <View
        style={{
            flexDirection: 'row',
            // justifyContent: 'flex-start',
            alignItems: 'center',
            paddingBottom: 10,
            gap: 10,
        }}
    >
        <View>
            <ThemedText bold size={20}>
                {title}
            </ThemedText>
        </View>

        {children && (
            <View>
                {children}
            </View>
        )}


    </View>
)
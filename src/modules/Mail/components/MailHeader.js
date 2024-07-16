import React from 'react'
import { View } from 'react-native'
import { ThemedText } from '@components'

export default ({ children, title }) => (
    <View
        style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingBottom: 10,
            gap: 10,
        }}
    >
        <View
            style={{
                flex: 1,
            }}
        >
                <ThemedText bold size={20}>
                    {title}
                </ThemedText>
        </View>

        {children && (
            <View
                style={{
                    flex: 3,
                }}
            >

                {children}
            </View>
        )}


    </View>
)
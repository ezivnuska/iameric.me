import React from 'react'
import { View } from 'react-native'
import { ThemedText } from '@components'
import { ActivityIndicator as Indicator } from 'react-native-paper'

const ActivityIndicator = ({ size = 'large', color = 'tomato', label = null, ...props }) => (
    <View
        {...props}
        style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
        }}
    >
        <View
            style={{
                gap: 10,
                marginHorizontal: 'auto',
            }}
        >
            {label && (
                <ThemedText color={color} size={24}>{label}</ThemedText>
            )}

            <Indicator
                size={size}
                color={color}
                style={{ marginHorizontal: 'auto' }}
            />
        </View>
    </View>
)

export default ActivityIndicator
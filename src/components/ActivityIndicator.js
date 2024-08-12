import React from 'react'
import { View } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'

export default ({ size = 'large', color = 'tomato', ...props }) => (
    <View
        {...props}
        style={{
            flex: 1,
            flexDirection: 'row',
            alignContent: 'center',
            textAlign: 'center',
        }}
    >
        <ActivityIndicator
            size={size}
            color={color}
            style={{ marginHorizontal: 'auto' }}
        />
    </View>
)
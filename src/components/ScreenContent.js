import React from 'react'
import {
    View,
} from 'react-native'

export default ({ children }) => (
    <View
        style={{
            paddingHorizontal: 10,
            paddingVertical: 10,
        }}
    >
        {children}
    </View>
)
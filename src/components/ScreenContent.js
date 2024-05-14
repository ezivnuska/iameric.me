import React from 'react'
import {
    View,
} from 'react-native'

export default ({ children, padded = true }) => (
    <View
        style={{
            paddingHorizontal: padded ? 10 : 0,
            // paddingVertical: 10,
        }}
    >
        {children}
    </View>
)
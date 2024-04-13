import React from 'react'
import {
    View,
} from 'react-native'

export default ({ children }) => (
    <View
        style={{
            height: '100%',
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
        }}
    >
        {children}
    </View>
)
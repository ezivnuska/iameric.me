import React from 'react'
import {
    View,
} from 'react-native'

export default ({ children, ...props }) => (
    <View
        style={[{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            width: '100%',
        }, props.style]}
    >
        {children}
    </View>
)
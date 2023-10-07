import React from 'react'
import {
    View,
} from 'react-native'

export default  ({ children, ...props }) => (
    <View
        style={[{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            // borderWidth: 5,
            // borderStyle: 'dashed',
            // height: '80%',
        }, props.style]}
    >
        {children}
    </View>
)
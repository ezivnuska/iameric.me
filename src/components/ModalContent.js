import React from 'react'
import { View } from 'react-native'

export default ({ children }) => (
    <View
        style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
        }}
    >
        {children}
    </View>
)
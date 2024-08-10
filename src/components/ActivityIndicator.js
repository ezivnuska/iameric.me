import React from 'react'
import { View } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'

export default ({ size, color, ...props }) => (
    <View
        style={{
            flex: 1,
            flexDirection: 'row',
            alignContent: 'center',
            textAlign: 'center',
        }}
    >
        <ActivityIndicator
            size='large'
            color='tomato'
            style={{ marginHorizontal: 'auto' }}
        />
    </View>
)
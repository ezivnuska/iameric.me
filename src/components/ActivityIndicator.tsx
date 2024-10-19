import React from 'react'
import { View } from 'react-native'
import { ActivityIndicator as Indicator } from 'react-native-paper'

const ActivityIndicator = ({ size = 'large', color = 'tomato', ...props }) => (
    <View
        {...props}
        style={{
            flex: 1,
            flexDirection: 'row',
            alignContent: 'center',
            textAlign: 'center',
        }}
    >
        <Indicator
            size={size}
            color={color}
            style={{ marginHorizontal: 'auto' }}
        />
    </View>
)

export default ActivityIndicator
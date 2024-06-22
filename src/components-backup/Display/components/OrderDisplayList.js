import React from 'react'
import {
    View,
} from 'react-native'
import {
    OrderDisplay,
} from '.'

export default ({ orders, onPress, ...props }) => (
    <View
        {...props}
        style={{
            gap: 10,
        }}
    >

        {orders.map((order, index) => (
            <OrderDisplay
                order={order}
                key={`order-display-${index}`}
                onPress={onPress}
            />
        ))}
        
    </View>
)
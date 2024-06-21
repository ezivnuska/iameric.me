import React from 'react'
import {
    Pressable,
    View,
} from 'react-native'
import {
    ThemedText,
} from '@components'
import {
    getOrderTotal,
    getOrderStatusMessage,
} from '@utils/orders'

export default ({ order, onPress, ...props }) => {
    // if (!order.vendor || !order.customer) return null
    return (
        <View
            {...props}
            style={{
                backgroundColor: 'tomato',
                borderRadius: '12',
                paddingVertical: 5,
                paddingHorizontal: 10,
            }}
        >
            <ThemedText>From: {order.vendor.username}</ThemedText>
            <ThemedText>To: {order.customer.username}</ThemedText>
            <ThemedText>{order.items.length} {`item${order.items.length > 1 ? 's' : ''}`}</ThemedText>
            <ThemedText>{`$${Number(getOrderTotal(order.items)).toFixed(2)}`}</ThemedText>
            {/* {order.driver && <ThemedText>{`Driver: ${order.driver.username}`}</ThemedText>} */}
            <ThemedText>{getOrderStatusMessage(order)}</ThemedText>
            <Pressable onPress={onPress}>
                <ThemedText>Show Details</ThemedText>
            </Pressable>
        </View>
    )
}
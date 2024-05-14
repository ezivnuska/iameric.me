import React, { useState } from 'react'
import {
    Pressable,
    View,
} from 'react-native'
import {
    OrderDetails,
    ThemedText,
} from '@components'
import {
    useOrders,
} from '@context'

export default () => {
    const { orders } = useOrders()
    const [detailsVisible, setDetailsVisible] = useState(false)
    return (
        <View
            style={{
                paddingHorizontal: 10,
            }}
        >
            {orders.map((order, index) => (
                <View key={`order-${index}`}>
                    <Pressable
                        onPress={() => setDetailsVisible(!detailsVisible)}
                    >
                        <ThemedText>{order._id}</ThemedText>
                    </Pressable>
                    {detailsVisible && (
                        <OrderDetails order={order} />
                    )}
                </View>
            ))}
        </View>
    )
}
import React, { useEffect } from 'react'
import {
    FlatList,
    View,
} from 'react-native'
import {
    EmptyStatus,
} from '@components'
import {
    OrderPreview,
} from './components'
import {
    useModal,
    useOrders,
} from '@context'

export default () => {

    const { closeModal } = useModal()
    const {
        orders,
    } = useOrders()

    useEffect(() => {
        // console.log('orders changed', orders)
        if (!orders.length) closeModal()
    }, [orders])

    return (
        <View
            style={{
                paddingVertical: 40,
            }}
        >
            {orders && orders.length
                ? (
                    <FlatList
                        data={orders.sort((a, b) => a.status >= b.status ? a : b)}
                        listKey={() => 'orders'}
                        keyExtractor={(item, index) => 'order-' + index}
                        renderItem={({ item, index }) => (
                            <OrderPreview
                                key={`order-preview-${index}`}
                                onPress={() => onPress(item)}
                                order={item}
                            />
                        )}
                    />
                ) : (
                    <EmptyStatus status='You have no pending orders.' />
                )}
        </View>
    )
}
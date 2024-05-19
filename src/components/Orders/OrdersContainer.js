import React, { useEffect } from 'react'
import {
    FlatList,
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
        if (!orders.length) closeModal()
    }, [orders])

    return orders && orders.length
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
        )
}
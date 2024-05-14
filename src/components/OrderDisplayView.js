import React from 'react'
import {
    Pressable,
} from 'react-native'
import {
    ThemedText,
} from '@components'
import {
    useModal,
    useOrders,
} from '@context'

export default () => {
    const { setModal } = useModal()
    const { orders, ordersLoaded } = useOrders()
    return ordersLoaded && orders.length ? (
        <Pressable onPress={() => setModal('ORDERS')}>
            <ThemedText style={{ padding: 10 }}>
                {`${orders.length} pending order${orders.length === 1 ? '' : 's'}`}
            </ThemedText>
        </Pressable>
    ) : null
}
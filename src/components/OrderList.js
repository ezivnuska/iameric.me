import React from 'react'
import {
    FlatList,
    View,
} from 'react-native'
import {
    EmptyStatus,
    IconButton,
    ThemedText,
    TimeSelector,
    OrderPreview,
} from '.'
import {
    useOrders,
    useUser,
} from '@context'
import {
    deleteOrderWithId,
    setDriverArrived,
    setOrderAccepted,
    setOrderClosed,
    setOrderCompleted,
    setOrderConfirmed,
    setOrderReady,
    setOrderReceived,
} from '@utils/orders'
import moment from 'moment'

export default () => {

    const {
        closeOrder,
        markDriverArrived,
        markOrderAccepted,
        markOrderCompleted,
        markOrderConfirmed,
        markOrderReady,
        markOrderReceived,
        orders,
        ordersLoading,
        removeOrder,
        setOrdersLoading,
    } = useOrders()
    const { profile } = useUser()

    const deleteOrder = async id => {
        setOrdersLoading(true)
        await deleteOrderWithId(id)
        setOrdersLoading(false)
        removeOrder(id)
    }

    const confirmOrder = async (id, time) => {
        
        const m = moment()
        const pickup = m.add(time, 'm')
        
        setOrdersLoading(true)
        const data = await setOrderConfirmed(id, pickup)
        setOrdersLoading(false)

        if (data) markOrderConfirmed(data)
    }

    const acceptDelivery = async id => {

        setOrdersLoading(true)
        const data = await setOrderAccepted(id, profile._id)
        setOrdersLoading(false)

        if (data) markOrderAccepted(data)
    }

    const onOrderReady = async id => {
        
        setOrdersLoading(true)
        const { data } = await setOrderReady(id)
        setOrdersLoading(false)

        if (data) markOrderReady(data)
    }

    const driverArrived = async id => {

        setOrdersLoading(true)
        const { data } = await setDriverArrived(id)
        setOrdersLoading(false)

        if (data) markDriverArrived(data)
    }

    const receivedOrder = async id => {

        setOrdersLoading(true)
        const { data } = await setOrderReceived(id)
        setOrdersLoading(false)
        
        if (data) markOrderReceived(data)
    }

    const completeDelivery = async id => {
        
        setOrdersLoading(true)
        const { data } = await setOrderCompleted(id)
        setOrdersLoading(false)

        if (data) {
            markOrderCompleted(data)
            removeOrder(data._id)
        }
    }

    const onOrderClosed = async id => {
        
        setOrdersLoading(true)
        const { data } = await setOrderClosed(id)
        setOrdersLoading(false)

        if (data) {
            closeOrder(data)
            removeOrder(data.id)
        }

    }

    const renderButton = (label, action) => (
        <IconButton
            type='primary'
            label={label}
            onPress={action}
            disabled={ordersLoading}
        />
    )

    const renderOrderProcessButton = order => {
        switch(profile.role) {
            case 'admin':if (order.status === 6) return renderButton('Delete Order', () => deleteOrder(order._id))
            case 'customer':
                if (order.status === 0) return renderButton('Cancel Order', () => deleteOrder(order._id))
                else if (order.status === 5) return renderButton('Order Received', () => onOrderClosed(order._id))
                else return <ThemedText bold>Order in progress.</ThemedText>
            break
            case 'vendor':
                if (order.status === 0) {
                    return (
                        <View>
                            <ThemedText>How long until ready?</ThemedText>
                            <TimeSelector onSelect={time => confirmOrder(order._id, time)} />
                        </View>
                    )
                }
                else if (order.status > 0 && order.status < 4 && !order.ready) return renderButton('Order is Ready', () => onOrderReady(order._id))
            break
            case 'driver':
                if (order.status === 1) return renderButton('Accept Delivery', () => acceptDelivery(order._id))
                else if (order.status === 2) return renderButton('Arrived at Vendor', () => driverArrived(order._id))
                else if (order.status === 3) return renderButton('Picked Up', () => receivedOrder(order._id))
                else if (order.status === 4) return renderButton('Delivery Complete', () => completeDelivery(order._id))
            break
            default:
                return null
        }
    }

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
                    >
                        <View
                            style={{
                                marginVertical: 3,
                                paddingHorizontal: 10,
                            }}
                        >
                            {renderOrderProcessButton(item)}
                        </View>

                    </OrderPreview>
                )}
            />
        ) : (
            <EmptyStatus status='You have no pending orders.' />
        )
}
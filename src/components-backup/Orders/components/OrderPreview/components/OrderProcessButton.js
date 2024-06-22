import React, { useEffect } from 'react'
import {
    View,
} from 'react-native'
import {
    IconButton,
    ThemedText,
    TimeSelector,
} from '@components'
import {
    useModal,
    useOrders,
    useApp,
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
import { classes } from '@styles'
import moment from 'moment'

const NextButton = ({ label, action }) => {
    const { ordersLoading } = useOrders()
    return (
        <IconButton
            type='primary'
            label={label}
            onPress={action}
            disabled={ordersLoading}
        />
    )
}

const AdminButton = ({ order, deleteOrder, onClosed }) => {
    const { profile } = useApp()
    return order.customer._id === profile._id && order.status === 5
        ? <NextButton label='Order Received' action={onClosed} />
        : <NextButton label='Delete as Admin' action={deleteOrder} />
}

const CustomerButton = ({ order, deleteOrder, onClosed }) => {
    // const { profile } = useApp()
    // if (profile._id !== order.customer._id) return null
    switch (order.status) {
        case 0:
            return <NextButton label='Cancel Order' action={deleteOrder} />
            break
        case 5: return <NextButton label='Order Received' action={onClosed} />
            break
        default: return null
    }
}

const VendorButton = ({ order, ready, confirm, onClosed }) => {
    switch (order.status) {
        case 0: return <TimeSelectionModule onSelected={time => confirm(time)} />
            break
        case 5: return <NextButton label='Order Received' action={onClosed} />
            break
        default:
            return !order.ready ? <NextButton label='Order is Ready' action={ready} /> : null
    }
}

const DriverButton = ({ order, accept, arrived, received, complete }) => {
    switch (order.status) {
        case 1: return <NextButton label='Accept Delivery' action={accept} />
            break
        case 2: return <NextButton label='Arrived at Vendor' action={arrived} />
            break
        case 3: return <NextButton label='Order Received' action={received} />
            break
        case 4: return <NextButton label='Order Delivered' action={complete} />
            break
        default:
            return null
    }
}

const TimeSelectionModule = ({ onSelected }) => (
    <View>
        <ThemedText style={classes.headerSecondary}>How long until ready?</ThemedText>
        <TimeSelector onSelect={onSelected} />
    </View>
)

export default ({ order, role }) => {

    console.log('role-------->', role)

    const { profile, socket } = useApp()
    const {
        closeOrder,
        markDriverArrived,
        markOrderAccepted,
        markOrderCompleted,
        markOrderConfirmed,
        markOrderReady,
        markOrderReceived,
        removeOrder,
        setOrdersLoading,
    } = useOrders()

    useEffect(() => {
        socket.on('remove_order', data => {
            console.log('removing order...')
            removeOrder(data)
        })
    }, [])

    // const getUserRole = () => {
    //     let role = null
    //     if (profile) {
    //         if (profile.role === 'admin') role = 'admin'
    //         else if (profile._id === order.vendor || profile._id === order.vendor._id) role = 'vendor'
    //         else if (profile._id === order.customer || profile._id === order.customer._id) role = 'customer'
    //         else if (order.driver && (profile._id === order.driver || profile._id === order.driver._id)) role = 'driver'
    //     }
    //     return role
    // }

    const deleteOrder = async id => {
        setOrdersLoading(true)
        await deleteOrderWithId(id)
        setOrdersLoading(false)
        removeOrder(id)
        socket.emit('order_removed', id)
    }

    const confirmOrder = async (id, time) => {
        
        const m = moment()
        const pickup = m.add(time, 'm')
        
        setOrdersLoading(true)
        const data = await setOrderConfirmed(id, pickup)
        setOrdersLoading(false)

        if (data) {
            markOrderConfirmed(data)
            socket.emit('order_updated', data)
        }
    }

    const acceptDelivery = async (orderId, driverId) => {

        setOrdersLoading(true)
        const order = await setOrderAccepted(orderId, driverId)
        setOrdersLoading(false)
        
        if (order) {
            markOrderAccepted(order)
            socket.emit('order_updated', order)
        }

        // closeModal()
    }

    const onOrderReady = async id => {
        
        setOrdersLoading(true)
        const order = await setOrderReady(id)
        setOrdersLoading(false)

        if (order) {
            markOrderReady(order)
            socket.emit('order_updated', order)
        }

        // closeModal()
    }

    const driverArrived = async id => {

        setOrdersLoading(true)
        const order = await setDriverArrived(id)
        setOrdersLoading(false)

        if (order) {
            markDriverArrived(order)
            socket.emit('order_updated', order)
        }

        // closeModal()
    }

    const receivedOrder = async id => {

        setOrdersLoading(true)
        const order = await setOrderReceived(id)
        setOrdersLoading(false)
        
        if (order) {
            markOrderReceived(order)
            socket.emit('order_updated', order)
        }
        
        // closeModal()
    }

    const completeDelivery = async id => {
        
        setOrdersLoading(true)
        const order = await setOrderCompleted(id)
        setOrdersLoading(false)

        if (order) {
            markOrderCompleted(order)
            // removeOrder(order._id)
            // socket.emit('order_removed', order._id)
            socket.emit('order_updated', order)
        }

        // closeModal()
    }

    const onOrderClosed = async id => {
        
        setOrdersLoading(true)
        const order = await setOrderClosed(id)
        setOrdersLoading(false)

        if (order) {
            closeOrder(order)
            removeOrder(order._id)
            socket.emit('order_removed', order._id)
        }
    }

    // const role = getUserRole()

    switch (role) {
        case 'admin': return (
            <AdminButton
                order={order}
                deleteOrder={() => deleteOrder(order._id)}
                onClosed={() => onOrderClosed(order._id)}
            />
        )
        break
        case 'customer': return (
            <CustomerButton
                order={order}
                deleteOrder={() => deleteOrder(order._id)}
                onClosed={() => onOrderClosed(order._id)}
            />
        )
        break
        case 'vendor': return (
            <VendorButton
                order={order}
                ready={() => onOrderReady(order._id)}
                deleteOrder={() => deleteOrder(order._id)}
                confirm={time => confirmOrder(order._id, time)}
                onClosed={() => onOrderClosed(order._id)}
            />
        )
        break
        case 'driver': return (
            <DriverButton
                order={order}
                accept={() => acceptDelivery(order._id, profile._id)}
                arrived={() => driverArrived(order._id)}
                received={() => receivedOrder(order._id)}
                complete={() => completeDelivery(order._id)}
            />
        )
        break
        default:
            return null
    }

    // return orders && orders.length
    //     ? (
    //         <FlatList
    //             data={orders.sort((a, b) => a.status >= b.status ? a : b)}
    //             listKey={() => 'orders'}
    //             keyExtractor={(item, index) => 'order-' + index}
    //             renderItem={({ item, index }) => (
    //                 <OrderPreview
    //                     key={`order-preview-${index}`}
    //                     onPress={() => onPress(item)}
    //                     order={item}
    //                 >
    //                     {renderOrderProcessButton(item, profile.role)}
    //                 </OrderPreview>
    //             )}
    //         />
    //     ) : (
    //         <EmptyStatus status='You have no pending orders.' />
    //     )
}
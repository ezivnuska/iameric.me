import React, { useContext, useEffect, useState } from 'react'
import {
    FlatList,
    View,
} from 'react-native'
import {
    ThemedText,
    IconButton,
    OrderPreview,
    TimeSelector,
} from '.'
import axios from 'axios'
import {
    AppContext,
    useOrders,
    useUser,
} from '@context'
import moment from 'moment'
import { getOrdersById } from '../utils/data'
import EmptyStatus from './EmptyStatus'

export default () => {
    const { profile } = useUser()
    const { orders } = useOrders()
    const {
        closeOrder,
        setOrders,
        removeOrder,
        markDriverArrived,
        markOrderAccepted,
        markOrderComplete,
        markOrderConfirmed,
        markOrderReady,
        markOrderReceived,
    } = useOrders()

    const {
        loading,
    } = useContext(AppContext)

    const [feature, setFeatured] = useState(null)
    const [featuredItem, setFeaturedItem] = useState(null)

    useEffect(() => {
        if (profile && !orders) loadOrders()
    }, [profile])

    const loadOrders = async () => {
        const loadedOrders = await getOrdersById(profile._id)
        setOrders(loadedOrders)
    }

    useEffect(() => {
        setFeaturedItem(getFeaturedItem(feature))
    }, [feature])

    const deleteOrder = async id => {
        console.log('deleting order')
        await axios.delete(`/api/order/${id}`)
        removeOrder(id)
    }

    const cancelOrder = async id => {

        deleteOrder(id)

        setFeatured(null)
    }

    const confirmOrder = async (id, time) => {
        
        const m = moment()
        const pickup = m.add(time, 'm')
        
        const { data } = await axios.
            post('/api/order/confirm', { id, pickup })

        if (!data) return console.log('Error confirming order')

        markOrderConfirmed(data)
    }

    const acceptDelivery = async id => {

        const { data } = await axios.
            post('/api/order/accept', { id, driver: profile._id })

        if (!data) console.log('Error accepting delivery')

        markOrderAccepted(data)

        setFeatured(null)
    }

    const onOrderReady = async id => {

        const { data } = await axios.
            post('/api/order/ready', { id })

        if (!data) console.log('Error marking order ready')

        markOrderReady(data)

        setFeatured(null)
    }

    const driverArrived = async id => {

        const { data } = await axios.
            post('/api/order/arrived', { id })

        if (!data) console.log('Error updating driver status')
        
        markDriverArrived(data)

        setFeatured(null)
    }

    const receivedOrder = async id => {

        const { data } = await axios.
            post('/api/order/received', { id })
        
        if (!data) console.log('Error marking order picked up')
        
        markOrderReceived(data)

        setFeatured(null)
    }

    const completeDelivery = async id => {
        
        const { data } = await axios.
            post('/api/order/complete', { id })

        if (!data) console.log('Error completing order')

        markOrderComplete(data)
        removeOrder(data.id)

        setFeatured(null)
    }

    const onOrderClosed = async id => {
        
        const { data } = await axios.
            post('/api/order/close', { id })

        if (!data) {
            console.log('Error closing order')
            return
        }

        closeOrder(data)
        removeOrder(data.id)

        setFeatured(null)
    }

    const renderButton = (label, action) => (
        <IconButton
            type='primary'
            label={label}
            onPress={action}
            disabled={loading}
        />
    )

    const renderOrderProcessButton = order => {
        switch(profile.role) {
            case 'admin':if (order.status === 6) return renderButton('Delete Order', () => deleteOrder(order._id))
            case 'customer':
                if (order.status === 0) return renderButton('Cancel Order', () => cancelOrder(order._id))
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

    const getFeaturedItem = id => {
        return orders ? orders.filter((order, index) => order._id === id)[0] : []
    }

    const onPress = order => {
        setFeatured(order._id)
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
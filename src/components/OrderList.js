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
import { AppContext } from '../AppContext'
import moment from 'moment'
import { getOrdersById } from '../utils/data'

export default () => {

    const {
        dispatch,
        orders,
        user,
    } = useContext(AppContext)

    const [loading, setLoading] = useState(false)
    const [featured, setFeatured] = useState(null)
    const [featuredItem, setFeaturedItem] = useState(null)
    const [items, setItems] = useState(orders)
    const [showCompletedOrders, setShowCompletedOrders] = useState(true)

    useEffect(() => {
        if (user && !items) loadOrders()
    }, [user])

    const sortOrders = array => {
        let active = []
        let completed = []
        array.map(item => item.status < 6 ? active.push(item) : completed.push(item))
        setItems([
            ...active,
            // ...completed,
        ])
    }

    useEffect(() => {
        setItems(orders)
    }, [orders])

    const loadOrders = async () => {
        
        dispatch({ type: 'SET_LOADING', loading: 'Loading orders...' })
        
        const loadedOrders = await getOrdersById(user._id)
        
        dispatch({ type: 'SET_ORDERS', orders: loadedOrders })
        dispatch({ type: 'SET_LOADING', loading: null })
    }

    const removeItem = id => {
        setItems(items.filter(item => item._id !== id))
    }

    useEffect(() => {
        setFeaturedItem(getFeaturedItem(featured))
    }, [featured])

    const deleteOrder = async id => {
        console.log('deleting order')
        setLoading(true)
        await axios.delete(`/api/order/${id}`)
        removeItem(id)
        dispatch({ type: 'REMOVE_ORDER', id })
        setLoading(false)
    }

    const cancelOrder = async id => {

        deleteOrder(id)

        setFeatured(null)
    }

    const confirmOrder = async (id, time) => {
        
        setLoading(true)
        
        const m = moment()
        const pickup = m.add(time, 'm')
        
        const { data } = await axios.
            post('/api/order/confirm', { id, pickup })
        
        setLoading(false)

        if (!data) return console.log('Error confirming order')

        dispatch({ type: 'CONFIRM_ORDER', order: data })

        // setFeatured(null)
    }

    const acceptDelivery = async id => {

        setLoading(true)

        const { data } = await axios.
            post('/api/order/accept', { id, driver: user._id })
        
        setLoading(false)

        if (!data) console.log('Error accepting delivery')

        dispatch({ type: 'ACCEPT_ORDER', order: data })

        setFeatured(null)
    }

    const onOrderReady = async id => {

        setLoading(true)

        const { data } = await axios.
            post('/api/order/ready', { id })
        
        setLoading(false)

        if (!data) console.log('Error marking order ready')

        console.log('data', data)

        dispatch({ type: 'ORDER_READY', order: data })

        setFeatured(null)
    }

    const driverArrived = async id => {

        setLoading(true)

        const { data } = await axios.
            post('/api/order/arrived', { id })
        
        setLoading(false)

        if (!data) console.log('Error updating driver status')
        
        dispatch({ type: 'DRIVER_ARRIVED', order: data })

        setFeatured(null)
    }

    const receivedOrder = async id => {

        setLoading(true)

        const { data } = await axios.
            post('/api/order/received', { id })
        
        setLoading(false)
        
        if (!data) console.log('Error marking order picked up')
        
        dispatch({ type: 'ORDER_RECEIVED', order: data })

        setFeatured(null)
    }

    const completeDelivery = async id => {
        console.log('completing order delivery')
        setLoading(true)
        
        const { data } = await axios.
            post('/api/order/complete', { id })
        
        setLoading(false)

        if (!data) console.log('Error completing order')

        dispatch({ type: 'COMPLETE_ORDER', order: data })
        dispatch({ type: 'REMOVE_ORDER', id: data.id })

        setFeatured(null)
    }

    const closeOrder = async id => {
        console.log('closing order')
        setLoading(true)
        
        const { data } = await axios.
            post('/api/order/close', { id })
        
        setLoading(false)
        // console.log('order-->', data)
        if (!data) console.log('Error closing order')

        dispatch({ type: 'CLOSE_ORDER', order: data })
        dispatch({ type: 'REMOVE_ORDER', id: data.id })

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
        // console.log('CASE', order.status, user ? user.role : 'no role')
        switch(user.role) {
            case 'admin':if (order.status === 6) return renderButton('Delete Order', () => deleteOrder(order._id))
            case 'customer':
                if (order.status === 0) return renderButton('Cancel Order', () => cancelOrder(order._id))
                else if (order.status === 5) return renderButton('Order Received', () => closeOrder(order._id))
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

    return items && items.length
        ? (
            <FlatList
                data={items.sort((a, b) => a.status >= b.status ? a : b)}
                listKey={() => 'orders'}
                keyExtractor={(item, index) => 'order-' + index}
                renderItem={({ item, index }) => (
                    <OrderPreview
                        key={`order-preview-${index}`}
                        onPress={() => onPress(item)}
                        order={item}
                    >
                        <View style={{ marginVertical: 3 }}>
                            {renderOrderProcessButton(item)}
                        </View>

                    </OrderPreview>
                )}
            />
        ) : (
            <ThemedText>No current orders.</ThemedText>
        )
}
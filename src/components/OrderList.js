import React, { useContext, useEffect, useState } from 'react'
import {
    Text,
    View,
} from 'react-native'
import {
    ButtonPrimary,
    OrderDetails,
    OrderPreview,
    PopUpModal,
    TimeSelector,
} from '.'
import axios from 'axios'
import { AppContext } from '../AppContext'
import moment from 'moment'
import classes from '../styles/classes'
import main from '../styles/main'

export default ({ orders }) => {

    const {
        dispatch,
        user,
    } = useContext(AppContext)

    const [loading, setLoading] = useState(false)
    const [featured, setFeatured] = useState(null)
    const [featuredItem, setFeaturedItem] = useState(null)

    useEffect(() => {
        console.log('orders......', orders)
    }, [])
    useEffect(() => {
        setFeaturedItem(getFeaturedItem(featured))
    }, [featured])

    const deleteOrder = async id => {
        setLoading(true)
        dispatch({ type: 'REMOVE_ORDER', id })
        await axios.delete(`/api/order/${id}`)
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

        setFeatured(null)
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
        
        setLoading(true)
        
        const { data } = await axios.
            post('/api/order/complete', { id })
        
        setLoading(false)

        if (!data) console.log('Error completing order')

        dispatch({ type: 'COMPLETE_ORDER', order: data })

        setFeatured(null)
    }

    const closeOrder = async id => {
        setLoading(true)
        
        const { data } = await axios.
            post('/api/order/close', { id })
        
        setLoading(false)

        if (!data) console.log('Error closing order')

        dispatch({ type: 'CLOSE_ORDER', order: data })

        setFeatured(null)
    }

    const renderButton = (label, action) => (
        <ButtonPrimary label={label} onPress={action} disabled={loading} />
    )

    const renderVendorForm = id => (
        <View>
            <Text style={classes.textDefault}>How long until ready?</Text>
            <TimeSelector onSelect={time => confirmOrder(id, time)} />
        </View>
    )

    const renderOrderProcessButton = order => {
        console.log('order.status', order.status)
        switch (order.status) {
            case 0: return user.role === 'vendor' ? renderVendorForm(order._id) : user.role === 'customer' ? renderButton('Cancel Order', () => cancelOrder(order._id)) : null; break
            case 1: return user.role === 'driver' ? renderButton('Accept Delivery', () => acceptDelivery(order._id)) : (user.role === 'vendor' && !order.ready) ? renderButton('Order is Ready', () => onOrderReady(order._id)) : null; break
            case 2: return user.role === 'driver' ? renderButton('Arrived at Vendor', () => driverArrived(order._id)) : (user.role === 'vendor' && !order.ready) ? renderButton('Order is Ready', () => onOrderReady(order._id)) : null; break
            case 3: return user.role === 'driver' ? renderButton('Picked Up', () => receivedOrder(order._id)) : (user.role === 'vendor' && !order.ready) ? renderButton('Order is Ready', () => onOrderReady(order._id)) : null; break
            case 4: return user.role === 'driver' ? renderButton('Delivery Complete', () => completeDelivery(order._id)) : null; break
            case 5: return user.role === 'customer' ? renderButton('Order Received', () => closeOrder(order._id)) : null; break
            default: return null
        }
    }

    const getFeaturedItem = id => {
        return orders.filter((order, index) => order._id === id)[0]
    }

    const onPress = order => {
        setFeatured(order._id)
    }

    return (
        <View style={[main.padded, { borderWidth: 1, borderColor: 'green' }]}>
            
            {orders.map((order, index) => (
                <OrderPreview
                    key={`order-preview-${index}`}
                    onPress={() => onPress(order)}
                    order={order}
                >
                    {renderOrderProcessButton(order)}
                </OrderPreview>
            ))}

            <PopUpModal
                visible={featured}
                onRequestClose={() => setFeatured(null)}
            >
                <OrderDetails order={featuredItem} />
            </PopUpModal>
        </View>
    )
}
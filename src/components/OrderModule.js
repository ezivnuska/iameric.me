import React, { useContext, useEffect, useState } from 'react'
import {
    Text,
    View,
} from 'react-native'
import {
    ButtonPrimary,
    ModalContent,
    OrderDetails,
    OrderPreview,
} from '.'
import axios from 'axios'
import { AppContext } from '../AppContext'
import { loadUserOrders } from '../utils/data'

export default () => {
    
    const {
        dispatch,
        user,
        orders,
    } = useContext(AppContext)

    const [loading, setLoading] = useState(false)
    const [featuredItem, setFeaturedItem] = useState(null)

    useEffect(() => {
        if (!orders) getOrders()
    }, [])

    const getOrders = async () => {
        setLoading(true)
        const orders = await loadUserOrders(user._id)
        setLoading(false)
        if (!orders) return
        dispatch({ type: 'SET_ORDERS', orders })
    }

    const getFeaturedItem = id => {
        return orders.filter((order, index) => order._id === id)[0]
    }

    const relevantOrders = orders => {
        switch(user.role) {
            case 'driver':
                return orders.filter(item => 
                    (item.status > 0 && item.status < 6) &&
                    (item.driver && item.driver._id == user._id)
                )
            break
            case 'customer':
                return orders.filter(item => {
                    return item.customer._id == user._id && item.status < 6
                })
            break
            case 'vendor':
                return orders.filter(item => {
                    return item.vendor._id == user._id && item.status < 6
                })
            break
        }
    }

    const removeOrder = id => {
        dispatch({ type: 'REMOVE_ORDER', id })
    }

    const deleteOrder = async id => {
        setLoading(true)
        removeOrder(id)
        await axios.delete(`/api/order/${id}`)
        setLoading(false)
    }

    const cancelOrder = async () => {

        deleteOrder(featuredItem)

        setFeaturedItem(null)
    }

    const setOrderConfirmed = id => {
        const item = {
            ...getItemById(id),
            status: 1,
        }
        setItems(orders.map(i => (i._id == id) ? item : i))

        setFeaturedItem(null)
    }

    const confirmOrder = async () => {

        setLoading(true)

        const order = await axios.
            post(`/api/order/confirm/${featuredItem}`)
        
        setLoading(false)
        
        if (!order) console.log('Error confirming order')

        dispatch({ type: 'CONFIRM_ORDER', id: featuredItem })

        setOrderConfirmed(order._id)
    }

    const getItemById = id => orders.filter(item => item._id == id)[0]

    const setOrderAccepted = id => {
        const item = {
            ...getItemById(id),
            status: 2,
        }
        
        setItems(orders.map(i => i._id == id ? item : i))
    }

    const acceptDelivery = async () => {

        setLoading(true)

        const { data } = await axios.
            post('/api/order/accept', { id: featuredItem, driver: user._id })
        
        setLoading(false)

        if (!data) console.log('Error confirming order')

        dispatch({ type: 'ACCEPT_ORDER', order: data })

        setOrderAccepted(data._id)
    }

    const setOrderReceived = id => {
        const item = {
            ...getItemById(id),
            status: 2,
        }
        console.log('item picked up', item)
        setItems(orders.map(i => i._id == id ? item : i))

        setFeaturedItem(null)
    }

    const receivedOrder = async () => {

        setLoading(true)

        const order = await axios.
            post('/api/order/received', { id: featuredItem, driver: user._id })
        
        setLoading(false)
        
        if (!order) console.log('Error marking order picked up')

        dispatch({ type: 'ORDER_RECEIVED', id: featuredItem, driver: user._id })

        setOrderReceived(order._id)

    }

    const completeDelivery = async () => {
        
        setLoading(true)
        
        const order = await axios.
            post(`/api/order/complete/${featuredItem}`)
        
        setLoading(false)

        if (!order) console.log('Error completing order')

        dispatch({ type: 'COMPLETE_ORDER', id: featuredItem })

        setFeaturedItem(null)
    }

    const renderOrderProcessButton = status => {
        console.log('status', status)
        switch (user.role) {
            case 'customer':
                return <ButtonPrimary label='Cancel Order' onPress={cancelOrder} disabled={loading} />
            break
            case 'vendor':
                if (status == 0)
                    return <ButtonPrimary label='Confirm Order' onPress={confirmOrder} disabled={loading} />
                    
                if (status == 4)
                    return <ButtonPrimary label='Clear Order' onPress={cancelOrder} disabled={loading} />
            break
            case 'driver':
                switch (status) {
                    case 1:
                        return <ButtonPrimary label='Accept Delivery' onPress={acceptDelivery} disabled={loading} />
                    break
                    case 2:
                        return <ButtonPrimary label='Picked Up' onPress={receivedOrder} disabled={loading} />
                    break
                    case 3:
                        return <ButtonPrimary label='Order Completed' onPress={completeDelivery} disabled={loading} />
                    break
                    case 4:
                        return <ButtonPrimary label='Clear Order' onPress={cancelOrder} disabled={loading} />
                    break
                    default:
                        return null

                } 
            break
            default:
                return null
        }
    }

    const renderOrderProcessForm = id => {
        const order = getFeaturedItem(id)
        console.log('renderOrderProcessForm', order)
        return (
            <View>
                <OrderDetails order={order} />
                {renderOrderProcessButton(order.status)}
            </View>
        )
    }

    const onPress = order => {
        setFeaturedItem(order._id)
    }

    const renderOrders = () => {
        if (loading) return <Text>Loading Orders...</Text>
        if (!orders || !orders.length) return null
        const items = relevantOrders(orders)
        console.log('rel orders', items)
        
        return (items && items.length) ? (
            <View>
                <View
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        columnGap: '3%',
                        flexWrap: 'wrap',
                    }}
                >
                    {items.map((order, index) => (
                        <OrderPreview
                            key={`order-preview-${index}`}
                            onPress={() => onPress(order)}
                            order={order}
                        />
                    ))}
                </View>
            
                <ModalContent
                    transparent={false}
                    visible={featuredItem}
                    onRequestClose={() => setFeaturedItem(null)}
                    label='Order Details'
                >
                    {featuredItem ? renderOrderProcessForm(featuredItem) : null}
                </ModalContent>
            </View>
        ) : <Text>No active orders.</Text>
    }

    return (
        <View style={{
            marginVertical: 10,
        }}>
            {renderOrders()}
        </View>
    )
}
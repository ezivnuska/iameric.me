import React, { useContext, useEffect, useState } from 'react'
import {
    StyleSheet,
    Text,
    View,
} from 'react-native'
import {
    ButtonPrimary,
    ModalContainer,
    ModalContent,
    OrderDetails,
    OrderPreview,
} from '.'
import axios from 'axios'
import { AppContext } from '../AppContext'

const OrderDisplay = () => {
    
    const {
        dispatch,
        user,
    } = useContext(AppContext)

    const [loading, setLoading] = useState(false)
    const [items, setItems] = useState(null)
    const [featuredItem, setFeaturedItem] = useState(null)

    useEffect(() => {
        getOrders()
    }, [])

    const getFeaturedItem = id => {
        return items.filter((order, index) => order._id === id)[0]
    }

    const relevantOrders = orders => {
        switch(user.role) {
            case 'driver':
                return orders.filter(item => {
                    return item.status == 1 || (item.driver && item.driver._id == user._id)
                })
            break
            case 'customer':
                return orders.filter(item => {
                    console.log('customer, user', item.customer._id, user._id)
                    return item.customer._id == user._id
                })
            break
            case 'vendor':
                return orders.filter(item => {
                    return item.vendor._id == user._id
                })
            break
        }
    }

    const getOrders = async () => {
        setLoading(true)
        
        const { data } = await axios.get('/api/orders')
        
        setLoading(false)

        if (!data.orders) console.log('no orders found')

        dispatch({ type: 'SET_ORDERS', orders: data.orders })

        const orders = relevantOrders(data.orders)
        
        setItems(orders)
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

        // const order = await axios.
        //     post(`/api/order/cancel/${featuredItem}`)
        
        // if (!order) console.log('Error confirming order')

        // dispatch({ type: 'CANCEL_ORDER', id: featuredItem })

        setFeaturedItem(null)
    }

    const setOrderConfirmed = id => {
        const item = {
            ...getItemById(id),
            status: 1,
        }
        setItems(items.map(i => (i._id == id) ? item : i))

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

    const getItemById = id => items.filter(item => item._id == id)[0]

    const setOrderAccepted = id => {
        const item = {
            ...getItemById(id),
            status: 2,
        }
        
        setItems(items.map(i => i._id == id ? item : i))
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
        setItems(items.map(i => i._id == id ? item : i))

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
        if (!items || !items.length) return null
        const orders = relevantOrders(items)
        return (orders && orders.length) ? (
            <View>
                <View style={styles.list}>
                    {orders.map((order, index) => (
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
        ) : null
    }

    return (
        <View style={styles.container}>
            {renderOrders()}
        </View>
    )
}

export default OrderDisplay

const styles = StyleSheet.create({
    container: {

    },
    heading: {
        marginBottom: 10,
        fontSize: 18,
        lineHeight: 22,
        fontWeight: 600,
    },
    list: {
        // borderWidth: 1,
        // borderStyle: 'dashed',
        // borderColor: 'green',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        columnGap: '3%',
        flexWrap: 'wrap',
    },
})
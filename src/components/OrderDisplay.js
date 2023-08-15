import React, { useContext, useEffect, useState } from 'react'
import {
    StyleSheet,
    Text,
    View,
} from 'react-native'
import {
    ButtonPrimary,
    ModalContainer,
    OrderDetails,
    OrderPreview,
} from '.'
import axios from 'axios'
import { AppContext } from '../AppContext'

const OrderDisplay = () => {
    
    const {
        dispatch,
        user,
        orders,
    } = useContext(AppContext)

    const [loading, setLoading] = useState(false)
    const [featuredItem, setFeaturedItem] = useState(null)

    useEffect(() => {
        getOrders()
    }, [])
    
    useEffect(() => {
        console.log('orders changed', orders)
    }, [orders])

    const getFeaturedItem = id => {
        const item = orders.filter((order, index) => order._id === id)[0]
        return item
    }
    const getOrders = async () => {
        setLoading(true)
        
        const { data } = await axios.get('/api/orders')
        
        setLoading(false)

        if (!data.orders) console.log('no orders found')

        console.log("order found", data.orders)
        dispatch({ type: 'SET_ORDERS', orders: data.orders })   
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

    const confirmOrder = async () => {

        setLoading(true)

        const order = await axios.
            post(`/api/order/confirm/${featuredItem}`)
        
        setLoading(false)
        
        if (!order) console.log('Error confirming order')

        dispatch({ type: 'CONFIRM_ORDER', id: featuredItem })

        setFeaturedItem(null)
    }

    const acceptDelivery = async () => {

        setLoading(true)

        const order = await axios.
            post('/api/order/accept', { id: featuredItem, driver: user._id })
        
        setLoading(false)

        if (!order) console.log('Error confirming order')

        dispatch({ type: 'ACCEPT_ORDER', order })

        setFeaturedItem(null)
    }

    const pickedUpOrder = async () => {

        setLoading(true)

        const order = await axios.
            post('/api/order/pickedup', { id: featuredItem, driver: user._id })
        
        setLoading(false)
        
        if (!order) console.log('Error marking order picked up')

        dispatch({ type: 'ORDER_PICKEDUP', id: featuredItem, driver: user._id })

        setFeaturedItem(null)
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
        console.log('user.role', user.role)
        switch (user.role) {
            case 'customer':
                return <ButtonPrimary label='Cancel Order' onPress={cancelOrder} disabled={loading} />
            break
            case 'vendor':
                return <ButtonPrimary label='Confirm Order' onPress={confirmOrder} disabled={loading} />
            break
            case 'driver':
                switch (status) {
                    case 1:
                        return <ButtonPrimary label='Accept Delivery' onPress={acceptDelivery} disabled={loading} />
                    break
                    case 2:
                        return <ButtonPrimary label='Picked Up' onPress={pickedUpOrder} disabled={loading} />
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
        return (
            <View style={styles.list}>
                {orders.map((order, index) => (
                    <OrderPreview
                        key={`order-preview-${index}`}
                        onPress={() => onPress(order)}
                        order={order}
                    />
                ))}
            </View>
        )
    }

    return loading
        ? <Text>Loading Orders...</Text>
        : (
            <View style={styles.container}>
                <Text style={styles.heading}>{orders.length ? 'Pending Orders' : 'No Pending Orders'}</Text>
                {
                    orders.length
                        ? renderOrders()
                        : null
                }
                
                <ModalContainer
                    animationType='slide'
                    transparent={false}
                    visible={featuredItem}
                    closeModal={() => setFeaturedItem(null)}
                    label='Order Details'
                >
                    {featuredItem ? renderOrderProcessForm(featuredItem) : null}
                </ModalContainer>
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
import React, { useContext, useEffect, useState } from 'react'
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    View,
} from 'react-native'
import {
    ButtonPrimary,
    ModalContainer,
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
    // const [items, setItems] = useState(orders)
    const [featuredItem, setFeaturedItem] = useState(null)

    useEffect(() => {
        getOrders()
    }, [])

    // useEffect(() => {
    //     console.log('orders changed', orders)
    //     // setItems(orders)
    // }, [orders])

    const getFeaturedItem = id => {
        // console.log('getting featuredItem', id)
        const item = orders.filter((order, index) => order._id === id)[0]
        return item
    }
    const getOrders = async () => {
        setLoading(true)
        
        const { data } = await axios.get('/api/orders')
        
        setLoading(false)

        if (!data.orders) console.log('no orders found')


        dispatch({ type: 'SET_ORDERS', orders: data.orders })
        
        // setItems(data.orders)
    }

    // const removeItem = id => {
    //     console.log('removing:id:', id)
    //     console.log('removing')
    //     // setItems(items.filter(item => item._id != id))
    // }

    const removeOrder = id => {
        dispatch({ type: 'REMOVE_ORDER', id })
    }

    const deleteOrder = async id => {
        setLoading(true)
        const { data } = await axios.delete(`/api/order/${id}`)
        removeOrder(id)
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

        dispatch({ type: 'ACCEPT_ORDER', id: featuredItem, driver: user._id })

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

    const renderOrderProcessForm = id => {
        const order = getFeaturedItem(id)
        const { status } = order
        switch (user.role) {
            case 'customer':
                return <ButtonPrimary label='Cancel Order' onPress={cancelOrder} disabled={loading} />
            break
            case 'vendor':
                return <ButtonPrimary label='Confirm Order' onPress={confirmOrder} disabled={loading} />
            break
            case 'driver':
                if (status == 1) 
                    return <ButtonPrimary label='Accept Delivery' onPress={acceptDelivery} disabled={loading} />
                if (status == 2)
                    return <ButtonPrimary label='Picked Up' onPress={pickedUpOrder} disabled={loading} />
                if (status == 3)
                    return <ButtonPrimary label='Order Completed' onPress={completeDelivery} disabled={loading} />
                if (status == 4)
                    return <ButtonPrimary label='Clear Order' onPress={cancelOrder} disabled={loading} />
            break
        }
    }

    const onPress = order => {
        setFeaturedItem(order._id)
    }

    return loading
        ? <Text>Loading Orders...</Text>
        : (
            <View style={styles.container}>
                <Text style={styles.heading}>{orders.length ? 'Pending Orders' : 'No Pending Orders'}</Text>
                {orders.length
                    ? (
                        <View style={styles.list}>

                            {orders.map((order, index) => (
                                <OrderPreview
                                    key={`order-preview-${index}`}
                                    onPress={() => onPress(order)}
                                    order={order}
                                />
                            ))}

                        </View>
                    ) : null}
                
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
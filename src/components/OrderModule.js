import React, { useContext, useEffect, useState } from 'react'
import {
    Text,
    View,
} from 'react-native'
import {
    IconButton,
    LoadingView,
    OrderDetails,
    OrderList,
    PopUpModal,
} from '.'
import axios from 'axios'
import { AppContext } from '../AppContext'
import { loadOrders } from '../utils/data'
import classes from '../styles/classes'
import { navigationRef } from 'src/navigators/RootNavigation'
import { CommonActions } from '@react-navigation/native'

export default () => {
    
    const {
        dispatch,
        loaded,
        user,
        orders,
    } = useContext(AppContext)

    const [items, setItems] = useState(null)
    const [loading, setLoading] = useState(false)
    const [featuredItem, setFeaturedItem] = useState(null)

    useEffect(() => {
        if (!orders || !orders.length) getOrders()
    }, [])

    useEffect(() => {
        if (user && !loaded) {
            dispatch({ type: 'SIGNOUT' })
        }
    }, [loaded])

    useEffect(() => {
        if (orders && orders.length) setItems(getRelevantOrders(orders))
    }, [orders])

    const getOrders = async () => {
        
        setLoading(true)
        
        await loadOrders(dispatch)
        
        setLoading(false)

        if (!orders) {
            console.log('error loading orders')
            return
        }

        const relevantOrders = getRelevantOrders(orders)
        
        if (!relevantOrders.length) {
            goToNextScreen()
        }
    }

    const goToNextScreen = () => {
        let nextScreen = 'Forum'
        if (user.role === 'customer') nextScreen = 'Vendors'
        if (user.role === 'vendor') nextScreen = 'Products'
        navigationRef.navigate(nextScreen)
    }

    const getFeaturedItem = id => {
        return orders.filter((order, index) => order._id === id)[0]
    }

    const getRelevantOrders = orders => {
        
        switch(user.role) {
            case 'driver':
                return orders.filter(item => item.status > 0 && item.status < 6)
            break
            case 'customer':
                return orders.filter(item => item.customer && item.customer._id == user._id && item.status < 6)
            break
            case 'vendor':
                return orders.filter(item => item.vendor && item.vendor._id === user._id && item.status < 6)
            break
            case 'admin':
                return orders.filter(item => item.status <= 5)
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
        // console.log('status', status)
        switch (user.role) {
            case 'customer':
                return (
                    <IconButton
                        label='Cancel Order'
                        onPress={cancelOrder}
                        disabled={loading}
                        bgColor='red'
                    />
                )
            break
            case 'vendor':
                if (status == 0)
                    return <IconButton label='Confirm Order' onPress={confirmOrder} disabled={loading} />
                    
                if (status == 4)
                    return <IconButton label='Clear Order' onPress={cancelOrder} disabled={loading} />
            break
            case 'driver':
                switch (status) {
                    case 1:
                        return <IconButton label='Accept Delivery' onPress={acceptDelivery} disabled={loading} />
                    break
                    case 2:
                        return <IconButton label='Picked Up' onPress={receivedOrder} disabled={loading} />
                    break
                    case 3:
                        return <IconButton label='Order Completed' onPress={completeDelivery} disabled={loading} />
                    break
                    case 4:
                        return <IconButton label='Clear Order' onPress={cancelOrder} disabled={loading} />
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
        // console.log('renderOrderProcessForm', order)
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

    // const renderOrders = () => {
    //     if (loading) return <Text>Loading Orders...</Text>
    //     if (!orders || !orders.length) return null
    //     // const items = relevantOrders(orders)
    //     // console.log('rel orders', items)
        
    //     return (
    //         <View>
    //             <View
    //                 style={{
    //                     display: 'flex',
    //                     flexDirection: 'row',
    //                     justifyContent: 'flex-start',
    //                     columnGap: '3%',
    //                     flexWrap: 'wrap',
    //                 }}
    //             >
    //                 {orders.map((order, index) => (
    //                     <OrderPreview
    //                         key={`order-preview-${index}`}
    //                         onPress={() => onPress(order)}
    //                         order={order}
    //                     />
    //                 ))}
    //             </View>
            
    //             <PopUpModal
    //                 visible={featuredItem}
    //                 onRequestClose={() => setFeaturedItem(null)}
    //             >
    //                 {featuredItem ? renderOrderProcessForm(featuredItem) : null}
    //             </PopUpModal>
    //         </View>
    //     )
    // }

    return (
        <View style={{
            marginVertical: 10,
        }}>
            {loading
                ? <LoadingView label={loading} />
                : (items && items.length)
                    ? <OrderList orders={items} />
                    : <Text style={classes.textDefault}>No orders.</Text>
            }
            
            <PopUpModal
                visible={featuredItem}
                onRequestClose={() => setFeaturedItem(null)}
            >
                {featuredItem ? renderOrderProcessForm(featuredItem) : null}
            </PopUpModal>
        </View>
    )
}
import React, { useContext, useEffect, useState } from 'react'
import {
    StyleSheet,
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

const ActiveOrders = () => {

    const {
        dispatch,
        user,
        orders,
    } = useContext(AppContext)

    const [loading, setLoading] = useState(false)
    const [activeOrders, setActiveOrders] = useState(orders)
    const [featured, setFeatured] = useState(null)

    useEffect(() => {
        getActiveOrders()
    }, [])

    const getActiveOrders = async () => {
        setLoading(true)
        const { data } = await axios.
            get('/api/orders/active', { driver: user._id })
        setLoading(false)
        if (!data) {
            console.log('could not get waiting orders')
            return
        }
        console.log('waiting orders', data.orders)
        setActiveOrders(data.orders)
    }

    const deleteOrder = async id => {
        setLoading(true)
        dispatch({ type: 'REMOVE_ORDER', id })
        await axios.delete(`/api/order/${id}`)
        setLoading(false)
    }

    const cancelOrder = async () => {

        deleteOrder(featured)

        // const order = await axios.
        //     post(`/api/order/cancel/${featuredItem}`)
        
        // if (!order) console.log('Error confirming order')

        // dispatch({ type: 'CANCEL_ORDER', id: featuredItem })

        setFeatured(null)
    }

    const acceptDelivery = async () => {

        setLoading(true)

        const { data } = await axios.
            post('/api/order/accept', { id: featured, driver: user._id })
        
        setLoading(false)

        if (!data) console.log('Error confirming order')

        dispatch({ type: 'ACCEPT_ORDER', order: data })

        setFeatured(null)
    }

    const receivedOrder = async () => {

        setLoading(true)

        const order = await axios.
            post('/api/order/received', { id: featured, driver: user._id })
        
        setLoading(false)
        
        if (!order) console.log('Error marking order picked up')

        dispatch({ type: 'ORDER_RECEIVED', id: featured, driver: user._id })

        setFeatured(null)
    }

    const completeDelivery = async () => {
        
        setLoading(true)
        
        const order = await axios.
            post(`/api/order/complete/${featured}`)
        
        setLoading(false)

        if (!order) console.log('Error completing order')

        dispatch({ type: 'COMPLETE_ORDER', id: featured })

        setFeatured(null)
    }

    const renderOrderProcessButton = status => {
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
    }

    const getFeaturedItem = id => {
        return orders.filter((order, index) => order._id === id)[0]
    }

    const renderOrderProcessForm = () => {
        const order = getFeaturedItem(featured)
        
        return (
            <View>
                <OrderDetails order={order} />
                {renderOrderProcessButton(order.status)}
            </View>
        )
    }

    const onPress = order => {
        setFeatured(order._id)
    }

    const renderOrders = () => loading
        ? null
        : (
            <View style={styles.list}>
                {(orders && orders.length)
                    ? orders.map((order, index) => (
                        <OrderPreview
                            key={`order-preview-${index}`}
                            onPress={() => onPress(order)}
                            order={order}
                        />
                    )) : null
                }
            </View>
        )

    return (
        <View style={styles.container}>
            {renderOrders()}

            <ModalContainer
                animationType='slide'
                transparent={false}
                visible={featured}
                closeModal={() => setFeatured(null)}
                label='Order Details'
            >
                {featured ? renderOrderProcessForm() : null}
            </ModalContainer>
        </View>
    )
}

export default ActiveOrders

const styles = StyleSheet.create({
    container: {

    },
})
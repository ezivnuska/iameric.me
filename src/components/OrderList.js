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

const OrderList = ({ orders }) => {

    const {
        dispatch,
        user,
    } = useContext(AppContext)

    const [loading, setLoading] = useState(false)
    const [activeOrders, setActiveOrders] = useState(orders)
    const [featured, setFeatured] = useState(null)

    // useEffect(() => {
    //     getActiveOrders()
    // }, [])

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

    const confirmOrder = async () => {

        setLoading(true)

        const { data } = await axios.
            post('/api/order/confirm', { id: featured })
        
        setLoading(false)

        if (!data) console.log('Error confirming order')

        dispatch({ type: 'CONFIRM_ORDER', order: data })

        setFeatured(null)
    }

    const acceptDelivery = async () => {

        setLoading(true)

        const { data } = await axios.
            post('/api/order/accept', { id: featured, driver: user._id })
        
        setLoading(false)

        if (!data) console.log('Error accepting delivery')

        dispatch({ type: 'ACCEPT_ORDER', order: data })

        setFeatured(null)
    }

    const pickedUpOrder = async () => {

        setLoading(true)

        const order = await axios.
            post('/api/order/pickedup', { id: featured, driver: user._id })
        
        setLoading(false)
        
        if (!order) console.log('Error marking order picked up')

        dispatch({ type: 'ORDER_PICKEDUP', id: featured, driver: user._id })

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

    const renderButton = (label, action) => (
        <ButtonPrimary label={label} onPress={action} disabled={loading} />
    )

    const renderOrderProcessButton = status => {
        if (user.role == 'customer') return renderButton('Cancel Order', cancelOrder)
        switch (status) {
            case 0: return renderButton('Confirm Order', confirmOrder); break
            case 1: return renderButton('Accept Delivery', acceptDelivery); break
            case 2: return renderButton('Picked Up', pickedUpOrder); break
            case 3: return renderButton('Delivery Complete', completeDelivery); break
            case 4: return renderButton('Clear Order', cancelOrder); break
            default: return null
        }
    }

    const getFeaturedItem = id => {
        return orders.filter((order, index) => order._id === id)[0]
    }

    const onPress = order => {
        setFeatured(order._id)
    }

    const renderOrders = () => (orders && orders.length)
        ? (
            <View style={styles.list}>
                {orders.map((order, index) => (
                    <OrderPreview
                        style={styles.item}
                        key={`order-preview-${index}`}
                        onPress={() => onPress(order)}
                        order={order}
                    />
                ))}
            </View>
        ) : null

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
                {featured ? <OrderDetails order={getFeaturedItem(featured)} /> : null}
                {featured ? renderOrderProcessButton(getFeaturedItem(featured).status) : null}
            </ModalContainer>
        </View>
    )
}

export default OrderList

const styles = StyleSheet.create({
    container: {

    },
    list: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        gap: '2%',
        marginVertical: 10,
    },
    item: {
        flex: 1,
        flexBasis: '32%',
        flexGrow: 1,
        flexShrink: 0,
        maxWidth: '32%',
        // flexBasis: 'auto',
        marginBottom: 5,
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 4,
        borderWidth: 0,
    }
})
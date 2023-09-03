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
    OrderDetails,
    OrderPreview,
    TimeSelector,
} from '.'
import axios from 'axios'
import { AppContext } from '../AppContext'
import moment from 'moment'
import defaultStyles from '../styles'

const OrderList = ({ orders }) => {

    const {
        dispatch,
        user,
    } = useContext(AppContext)

    const [loading, setLoading] = useState(false)
    const [activeOrders, setActiveOrders] = useState(orders)
    const [featured, setFeatured] = useState(null)
    const [featuredItem, setFeaturedItem] = useState(null)

    useEffect(() => {
        setFeaturedItem(getFeaturedItem(featured))
    }, [featured])

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

    const confirmOrder = async time => {
        
        setLoading(true)
        
        const m = moment()
        const pickup = m.add(time, 'm')
        
        const { data } = await axios.
            post('/api/order/confirm', { id: featured, pickup })
        
        setLoading(false)

        if (!data) console.log('Error confirming order')
        console.log('Confirmed order:', data)

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

    const driverArrived = async () => {

        setLoading(true)

        const { data } = await axios.
            post('/api/order/arrived', { id: featured })
        
        setLoading(false)

        if (!data) console.log('Error updating driver status')
        console.log('...', data)
        dispatch({ type: 'DRIVER_ARRIVED', order: data })

        setFeatured(null)
    }

    const receivedOrder = async () => {

        setLoading(true)

        const { data } = await axios.
            post('/api/order/received', { id: featured })
        
        setLoading(false)
        
        if (!data) console.log('Error marking order picked up')
        
        dispatch({ type: 'ORDER_RECEIVED', order: data })

        setFeatured(null)
    }

    const completeDelivery = async () => {
        
        setLoading(true)
        
        const { data } = await axios.
            post('/api/order/complete', { id: featured })
        
        setLoading(false)

        if (!data) console.log('Error completing order')

        dispatch({ type: 'COMPLETE_ORDER', order: data })

        setFeatured(null)
    }

    const renderButton = (label, action) => (
        <ButtonPrimary label={label} onPress={action} disabled={loading} />
    )

    const renderVendorForm = () => (
        <View>
            <Text style={defaultStyles.text}>How long until ready?</Text>
            <TimeSelector onSelect={confirmOrder} />
        </View>
    )

    const renderOrderProcessButton = status => {
        if (user.role == 'customer') return renderButton(`${status === 0 ? 'Cancel' : 'Clear'} Order`, cancelOrder)
        switch (status) {
            case 0: return renderVendorForm(); break
            case 1: return renderButton('Accept Delivery', acceptDelivery); break
            case 2: return renderButton('Arrived at Vendor', driverArrived); break
            case 3: return renderButton('Picked Up', receivedOrder); break
            case 4: return renderButton('Delivery Complete', completeDelivery); break
            case 5: return renderButton('Clear Order', cancelOrder); break
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
                loading={loading}
            >
                {featuredItem
                    ? (
                        <View>
                            <OrderDetails order={featuredItem} />
                            {renderOrderProcessButton(featuredItem.status)}
                        </View>
                    )
                    : null
                }
                
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
        flexDirection: 'column',
        justifyContent: 'flex-start',
        rowGap: 5,
        marginVertical: 10,
    },
    item: {
        flex: 1,
        flexBasis: 'auto',
        flexGrow: 0,
        flexShrink: 0,
        marginBottom: 5,
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 4,
        borderWidth: 0,
    },
    activity: {

    },
})
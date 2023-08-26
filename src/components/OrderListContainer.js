import React, { useContext, useEffect, useState } from 'react'
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import {
    // ButtonPrimary,
    OrderList,
} from '.'
import { AppContext } from '../AppContext'
import axios from 'axios'

const OrderListContainer = () => {

    const {
        user,
        dispatch,
        orders,
    } = useContext(AppContext)

    const [loading, setLoading] = useState(false)
    const [current, setCurrent] = useState([])
    const [available, setAvailable] = useState([])

    useEffect(() => {
        getOrders()
    }, [])

    useEffect(() => {
        sortOrders()
    }, [orders])

    const getOrders = async () => {
        setLoading(true)
        const { data } = await axios.
            get(`/api/orders/${user.role}/${user._id}`)

        setLoading(false)
        
        if (!data) {
            console.log('could not get user orders')
            return
        }
        
        dispatch({ type: 'SET_ORDERS', orders: data.orders })
    }

    const sortOrders = () => {
        setCurrent(currentUserOrders())
        setAvailable(getAvailableOrders())
    }

    const currentUserOrders = () => {
        const { role } = user
        return orders.filter(order => (order[role] && order[role]._id === user._id))
    }

    const getAvailableOrders = () => orders.filter(order => order.status === 1)

    const renderAvailableOrders = () => {
        if (user.role !== 'driver') return null
        return (available && available.length) ? (
            <View>
                <Text>Available Orders</Text>
                <OrderList orders={available} />
            </View>
        ) : <Text>No available orders</Text>
    }

    const renderCurrentOrders = () => (current && current.length) ? (
        <View>
            <Text>Current Orders</Text>
            <OrderList orders={current} />
        </View>
    ) : null
    
    return loading
        ? <Text>Loading...</Text>
        : (
            <View style={styles.container}>
                {renderCurrentOrders()}
                
                {renderAvailableOrders()}        
            </View>
        )
}

export default OrderListContainer

const styles= StyleSheet.create({
    container: {

    },
    controls: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        flex: 1,
        textAlign: 'center',
        backgroundColor: 'blue',
    },
    buttonDisabled: {
        backgroundColor: '#ccc',
    },
    buttonLabel: {
        marginHorizontal: 'auto',
        fontSize: 20,
        lineHeight: 30,
        color: '#000',
    },
    buttonLabelDisabled: {
        color: '#fff',
    },
})
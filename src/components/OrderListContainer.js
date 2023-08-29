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
        dispatch,
        state,
        user,
    } = useContext(AppContext)
    
    const { orders } = state
    
    const [loading, setLoading] = useState(false)
    const [current, setCurrent] = useState([])
    const [available, setAvailable] = useState([])
    const [completed, setCompleted] = useState([])

    useEffect(() => {
        getOrders()
    }, [])

    useEffect(() => {
        sortOrders(orders)
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

    const sortOrders = items => {
        setCurrent(currentUserOrders(items))
        setAvailable(getAvailableOrders(items))
        setCompleted(getCompletedOrders(items))
    }

    const currentUserOrders = (items) => {
        return items.filter(order => {
            return user.role === 'driver'
                ? order[user.role] && order[user.role]._id === user._id && order.status < 5
                : order[user.role] && order[user.role]._id === user._id && order.status < 5
        })
    }

    const getAvailableOrders = (items) => items.filter(order => order.status === 1)

    const getCompletedOrders = (items) => items.filter(order => order[user.role] && order[user.role]._id === user._id && order.status === 5)

    const renderAvailableOrders = () => {
        if (user.role !== 'driver') return null
        return (available && available.length) ? (
            <View>
                <Text>Available Orders</Text>
                <OrderList orders={available} />
            </View>
        ) : <Text>No available orders</Text>
    }

    const renderCompletedOrders = () => {
        // if (user.role !== 'vendor') return null
        return (completed && completed.length) ? (
            <View>
                <Text>Completed Orders</Text>
                <OrderList orders={completed} />
            </View>
        ) : null
    }

    const renderCurrentOrders = () => (current && current.length) ? (
        <View>
            <Text>Current Orders</Text>
            <OrderList orders={current} />
        </View>
    ) : <Text>No current orders</Text>
    
    return loading
        ? <Text>Loading...</Text>
        : (
            <View style={styles.container}>
                {renderCurrentOrders()}
                
                {renderAvailableOrders()}

                {renderCompletedOrders()}
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
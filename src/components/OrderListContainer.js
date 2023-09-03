import React, { useContext, useEffect, useState } from 'react'
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import {
    DefaultText,
    OrderList,
} from '.'
import { AppContext } from '../AppContext'
import axios from 'axios'
import defaultStyles from '../styles'
import { set } from 'mongoose'

const OrderListContainer = () => {

    const {
        dispatch,
        user,
        orders,
    } = useContext(AppContext)
    
    const [loading, setLoading] = useState(false)
    const [pending, setPending] = useState([])
    const [current, setCurrent] = useState([])
    const [available, setAvailable] = useState([])
    const [completed, setCompleted] = useState([])

    useEffect(() => {
        getOrders()
    }, [])

    useEffect(() => {
        console.log('orders changed')
        
        if (orders) {
            console.log('orders changed', orders)
            sortOrdersByStatus(orders)
        }
    }, [orders])

    const getOrders = async () => {
        
        console.log('getting orders')
        setLoading(true)

        const url = () => {
            switch (user.role) {
                case 'customer':
                    return `/api/orders/${user._id}`
                break
                case 'vendor':
                case 'driver':
                    return  `/api/orders`
                break
            }
        }
        
        const { data } = await axios.
            get(url())
        
        setLoading(false)
        console.log('WOW', data)
        
        if (!data) {
            console.log('could not get user orders')
            return
        }

        console.log('WOW', data)
        
        dispatch({ type: 'SET_ORDERS', orders: data })
    }

    const sortOrdersByStatus = orders => {
        const pending = []
        const current = []
        const available = []
        const completed = []

        orders.map((order) => {
            console.log('order/status', order, order.status)
            switch (order.status) {
                case 0:
                    pending.push(order)
                break
                case 1:
                    available.push(order)
                break
                case 2:
                case 3:
                case 4:
                    current.push(order)
                break
                case 5:
                    completed.push(order)
                break
            }
        })

        console.log('pending', pending)
        console.log('current', current)
        console.log('available', available)
        console.log('completed', completed)

        setPending(pending)
        setCurrent(current)
        setAvailable(available)
        setCompleted(completed)

    }

    // const sortOrders = items => {
    //     setCurrent(currentUserOrders(items))
    //     setAvailable(getAvailableOrders(items))
    //     setCompleted(getCompletedOrders(items))
    // }

    // const currentUserOrders = (items) => {
    //     return items.filter(order => {
    //         return user.role === 'driver'
    //             ? order[user.role] && order[user.role]._id === user._id && order.status < 5
    //             : order[user.role] && order[user.role]._id === user._id && order.status < 5
    //     })
    // }

    // const getAvailableOrders = (items) => items.filter(order => order.status === 1)

    // const getCompletedOrders = (items) => items.filter(order => order[user.role] && order[user.role]._id === user._id && order.status === 5)

    const renderPendingOrders = () => {
        if (user.role === 'driver') return null
        return (pending.length) ? (
            <View>
                <DefaultText>Pending Orders</DefaultText>
                <OrderList orders={pending} />
            </View>
        ) : <DefaultText>No pending orders</DefaultText>
    }
    
    const renderAvailableOrders = () => {
        console.log('available.......', available)
        return user.role === 'driver' && available.length ? (
            <View>
                <DefaultText>Available Orders</DefaultText>
                <OrderList orders={available} />
            </View>
        ) : <DefaultText>No available orders</DefaultText>
    }

    const renderCompletedOrders = () => {
        // if (user.role !== 'vendor') return null
        return (completed && completed.length) ? (
            <View>
                <DefaultText>Completed Orders</DefaultText>
                <OrderList orders={completed} />
            </View>
        ) : null
    }

    const renderCurrentOrders = () => (current && current.length) ? (
        <View>
            <DefaultText>Current Orders</DefaultText>
            <OrderList orders={current} />
        </View>
    ) : <DefaultText>No current orders</DefaultText>
    
    return loading
        ? <DefaultText>Loading...</DefaultText>
        : (
            <View style={styles.container}>
                {renderPendingOrders()}

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
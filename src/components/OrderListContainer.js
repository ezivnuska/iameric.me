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
    const [closed, setClosed] = useState([])

    useEffect(() => {
        getOrders()
    }, [])

    useEffect(() => {
        if (orders) {
            sortOrdersByStatus(orders)
        }
    }, [orders])

    const getOrders = async () => {
        
        setLoading(true)

        const url = () => {
            switch (user.role) {
                case 'customer':
                case 'vendor':
                    return `/api/orders/${user._id}`
                break
                case 'driver':
                    return  `/api/orders`
                break
            }
        }
        
        const { data } = await axios.get(url())
        
        setLoading(false)
        
        if (!data) {
            return console.log('could not get user orders')
        }
        
        dispatch({ type: 'SET_ORDERS', orders: data })
    }

    const sortOrdersByStatus = orders => {
        // const pending = []
        const current = []
        const available = []
        // const completed = []
        const closed = []

        orders.map((order) => {
            switch (order.status) {
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                    if (user.role !== 'driver' || (user.role === 'driver' && order.driver && order.driver._id === user._id)) current.push(order)
                    if (user.role === 'driver' && order.status === 1) available.push(order)
                break
                case 6:
                    closed.push(order)
                break
            }
        })

        // console.log('pending', pending)
        // console.log('current', current)
        // console.log('available', available)
        // console.log('completed', completed)

        // setPending(pending)
        setCurrent(current)
        setAvailable(available)
        // setCompleted(completed)
        setClosed(closed)

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

    // const renderPendingOrders = () => {
    //     return (pending.length) ? (
    //         <View>
    //             <DefaultText>Pending Orders</DefaultText>
    //             <OrderList orders={pending} />
    //         </View>
    //     ) : null
    // }
    
    const renderAvailableOrders = () => {
        return (user.role === 'driver' && available.length)
            ? (
                <View>
                    <DefaultText>Available Orders</DefaultText>
                    <OrderList orders={available} />
                </View>
            ) : <DefaultText>No available orders</DefaultText>
    }

    // const renderCompletedOrders = () => {
    //     // if (user.role !== 'vendor') return null
    //     return (completed && completed.length) ? (
    //         <View>
    //             <DefaultText>Completed Orders</DefaultText>
    //             <OrderList orders={completed} />
    //         </View>
    //     ) : null
    // }

    const renderCurrentOrders = () => {
        return (current && current.length) ? (
            <View>
                <DefaultText>Current Orders</DefaultText>
                <OrderList orders={current} />
            </View>
        ) : null
    }
    
    return !loading
        ? (
            <View style={styles.container}>

                {renderCurrentOrders()}
                
                {user.role === 'driver' && renderAvailableOrders()}

                {/* {renderCompletedOrders()} */}
            </View>
        ) : null
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
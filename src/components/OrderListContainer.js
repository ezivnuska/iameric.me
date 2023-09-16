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
    PanelView,
} from '.'
import { AppContext } from '../AppContext'
import axios from 'axios'
import main from '../styles/main'

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
        const current = []
        const available = []
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

        setCurrent(current)
        setAvailable(available)
        setClosed(closed)

    }
    
    const renderAvailableOrders = () => available.length
        ? <OrderList orders={available} />
        : null

    const renderCurrentOrders = () => current.length
        ? <OrderList orders={current} />
        : null

    const ordersExist = () => {
        if (current.length) return true
        if (user.role === 'driver' && available.length) return true
        return false
    }
    
    return !loading
        ? ordersExist()
        ? (
            <View>

                {renderCurrentOrders()}
                
                {user.role === 'driver' && renderAvailableOrders()}

                {/* {renderCompletedOrders()} */}
            </View>
        ) : null : null
}

export default OrderListContainer

const styles= StyleSheet.create({
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
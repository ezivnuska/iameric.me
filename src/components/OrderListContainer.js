import React, { useContext, useEffect, useState } from 'react'
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import {
    ButtonPrimary,
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
    const [items, setItems] = useState([])
    const [type, setType] = useState('current')

    useEffect(() => {
        getOrders()
    }, [])

    useEffect(() => {
        sortOrders()
    }, [orders])

    useEffect(() => {
        sortOrders()
    }, [type])

    // useEffect(() => {
    // }, [items])

    const getOrders = async () => {
        setLoading(true)
        const { data } = await axios.
            get(`/api/orders/${user.role}/${user._id}`)
        setLoading(false)
        if (!data) {
            console.log('could not get user orders')
            return
        }
        // console.log('user orders...', data.orders.length, data.orders)
        dispatch({ type: 'SET_ORDERS', orders: data.orders })
    }

    const sortOrders = () => {
        let array = orders
        if (user.role === 'driver') {
            if (type == 'current') {
                array = getCurrentOrders()
            } else {
                array = getAvailableOrders()
            }
        }
        
        setItems(array)
    }

    const getAvailableOrders = () => orders.filter(order => {
            if (order.status === 1) {
                return order
            }
        })

    const getCurrentOrders = () => {
        if (!orders) {
            console.log('no orders!!!!')
            return []
        }
        if (user.role === 'driver') {
            return orders.filter(order => {
                if (order.driver && order.driver._id === user._id)
                    return order
            })
        }
    }

    const renderTabs = () => {
        if (user.role === 'driver') {
            return (
                <View style={styles.controls}>
                    <ButtonPrimary
                        style={styles.button}
                        label={'Current'}
                        disabled={type === 'current'}
                        onPress={() => setType('current')}
                    />
                    <ButtonPrimary
                        style={styles.button}
                        label={'Available'}
                        disabled={type === 'available'}
                        onPress={() => setType('available')}
                    />
                </View>
            )
        }
        return null
    }
    
    return loading
        ? <Text>Loading...</Text>
        : (
            <View style={styles.container}>
            
                {renderTabs()}

                {<OrderList orders={items} />}
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
    },
})
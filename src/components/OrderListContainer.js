import React, { useContext, useEffect, useState } from 'react'
import {
    Text,
} from 'react-native'
import {
    OrderList,
} from '.'
import { AppContext } from '../AppContext'
import main from '../styles/main'

export default () => {

    const {
        user,
        orders,
    } = useContext(AppContext)
    
    const [current, setCurrent] = useState([])

    useEffect(() => {
        if (orders) sortOrders(orders.filter(order => order.status < 6))
    }, [orders])

    const driverOrders = activeOrders => activeOrders.filter(order => ((order.driver && order.driver._id === user._id) || (order.status === 1)))
    const customerOrders = activeOrders => activeOrders.filter(order => order)
    const vendorOrders = activeOrders => activeOrders.filter(order => order)

    const sortOrders = activeOrders => {
        let sortedOrders = []
        if (user.role === 'customer') sortedOrders = customerOrders(activeOrders)
        if (user.role === 'vendor') sortedOrders = vendorOrders(activeOrders)
        if (user.role === 'driver') sortedOrders = driverOrders(activeOrders)
        setCurrent(sortedOrders.length ? sortedOrders : [])
    }
    
    return current.length
        ? <OrderList orders={current} />
        : <Text style={[main.text, main.paddedV]}>No current or available orders.</Text>
}
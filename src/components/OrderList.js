import React, { useContext, useEffect, useState } from 'react'
import {
    ActivityIndicator,
    FlatList,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import { ItemizedList } from '.'
import axios from 'axios'
import { AppContext } from '../AppContext'

const OrderList = () => {

    const {
        orders,
    } = useContext(AppContext)

    // const [items, setItems] = useState(null)
    const [loading, setLoading] = useState(false)

    // useEffect(() => {
    //     getOrders()
    // }, [])

    // useEffect(() => {
    //     getOrders()
    // }, [orders])

    // const getOrders = async () => {
    //     setLoading(true)
    //     const { data } = await axios.get('/api/orders')
    //     console.log('orders...', data.orders)
    //     setLoading(false)
    //     if (!data.orders) console.log('no orders found')
    //     console.log('orders found', data.orders)
    //     setItems(data.orders)
    // }

    return (
        <FlatList
            data={orders}
            listKey={() => 'products'}
            keyExtractor={(item, index) => 'product' + index}
            renderItem={({ item }) => {
                console.log('OrderList:item:', item)
                return (
                    <ItemizedList
                        order={item}
                    />
                )
            }} 
        />
    )
}

export default OrderList
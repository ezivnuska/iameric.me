import React, { useContext, useEffect, useState } from 'react'
import {
    StyleSheet,
    View,
} from 'react-native'
import { AppContext } from '../AppContext'
import {
    CustomerHome,
    DriverHome,
    OrderDisplay,
    // UserHeading,
    VendorHome,
} from '../components'
// import axios from 'axios'

const UserScreen = props => {

    const {
        // dispatch,
        user,
        // orders,
    } = useContext(AppContext)

    // const [items, setItems] = useState(orders)
    // const [loading, setLoading] = useState(false)

    // useEffect(() => {
    //     console.log('init')
    //     getOrders()
    // }, [])

    // useEffect(() => {
    //     console.log('refresh')
    //     setItems(orders)
    // }, [orders])

    // const getOrders = async () => {
    //     console.log('getting orders')
    //     setLoading(true)
        
    //     const { data } = await axios.get('/api/orders')
        
    //     setLoading(false)

    //     if (!data.orders) console.log('no orders found')

    //     console.log('orders found', data.orders)

    //     dispatch({ type: 'SET_ORDERS', orders: data.orders })
        
    //     setItems(data.orders)
    // }

    // const removeItem = id => {
    //     console.log('removing:id:', id)
    //     console.log('removing')
    //     setItems(items.filter(item => item._id != id))
    // }

    // const removeOrder = id => {
    //     dispatch({ type: 'REMOVE_ORDER', id })
    // }

    // const deleteOrder = async id => {
    //     setLoading(true)
    //     const { data } = await axios.delete(`/api/order/${id}`)
    //     console.log('deleted', data.order)
    //     removeItem(id)
    //     removeOrder(id)
    //     setLoading(false)
    // }

    const renderUserHome = () => {
        switch(user.role) {
            case 'customer': return <CustomerHome />
            case 'driver': return <DriverHome />
            case 'vendor': return <VendorHome />
        }
    }
    return (
        <View style={styles.container} { ...props }>
            
            <View style={styles.heading}>
                <OrderDisplay />
            </View>
            
            {renderUserHome()}

        </View>
    )
}

export default UserScreen

const styles = StyleSheet.create({
    container: {

    },
    heading: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        // backgroundColor: 'yellow',
    },
})
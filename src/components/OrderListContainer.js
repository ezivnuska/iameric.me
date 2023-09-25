import React, { useContext, useEffect, useState } from 'react'
import {
    Text,
} from 'react-native'
import {
    LoadingView,
    OrderList,
    PanelView,
} from '.'
import { AppContext } from '../AppContext'
import axios from 'axios'
import { navigate } from '../navigators/RootNavigation'
import main from '../styles/main'

const OrderListContainer = () => {

    const {
        dispatch,
        loaded,
        user,
        orders,
    } = useContext(AppContext)
    
    const [current, setCurrent] = useState([])
    const [available, setAvailable] = useState([])

    // useEffect(() => {
    //     if (!user || !loaded) navigate('Start')
    // }, [])

    useEffect(() => {
        if (orders) sortOrders()
    }, [orders])

    const sortOrders = () => {
        const current = []
        const available = []

        orders.map((order) => {
            switch (order.status) {
                case order.status <= 5:
                    if (user.role !== 'driver' || (user.role === 'driver' && order.driver && order.driver._id === user._id)) current.push(order)
                    if (user.role === 'driver' && order.status === 1) available.push(order)
                // break
                // case 6:
                //     closed.push(order)
                // break
            }
        })

        setCurrent(current)
        setAvailable(available)

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
    
    return (
        <PanelView type='full'>
            {ordersExist()
                ? (
                    <PanelView>

                        {renderCurrentOrders()}
                        
                        {user.role === 'driver' && renderAvailableOrders()}

                        {/* {renderCompletedOrders()} */}
                    </PanelView>
                )
                : (user.role === 'driver')
                ? <Text style={[main.text, main.padded]}>No current or available orders.</Text>
                : (user.role === 'vendor')
                ? <Text style={[main.text, main.padded]}>No current or pending orders.</Text>
                : null
            }
        </PanelView>
    )
}

export default OrderListContainer
import React, { useContext, useEffect, useState } from 'react'
import {
    Text,
    View,
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
            }
        })

        setCurrent(current)
        setAvailable(available)

    }
    
    const renderAvailableOrders = () => available.length
        ? <OrderList orders={available} />
        : renderText('No available orders.')

    const renderCurrentOrders = () => current.length
        ? <OrderList orders={current} />
        : renderText('No current or available orders.')

    const renderText = text => (
        // <PanelView>
            <Text style={[main.text, main.paddedV]}>{text}</Text>
        // </PanelView>
    )
    
    return (
        <View>
            {renderCurrentOrders()}
            {user.role === 'driver' && renderAvailableOrders()}
        </View>
    )
}

export default OrderListContainer
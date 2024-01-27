import React, { useContext, useEffect, useState } from 'react'
import {
    View,
} from 'react-native'
import {
    CartProductPreview,
    IconButton,
} from '.'
import { AppContext } from '../AppContext'
import classes from '../styles/classes'
import axios from 'axios'

export default ({ onSubmitted }) => {

    const {
        dispatch,
        user,
        cart,
    } = useContext(AppContext)

    const [loading, setLoading] = useState(false)

    // useEffect(() => {
    //     if (cart) {
    //         console.log('cart', cart)
    //     }
    // }, [cart])

    const getVendor = () => {
        let id = null
        cart[0].items.map(item => id = item.vendor ? item.vendor._id : null)
        return id
    }

    const submitOrder = async () => {
        const newOrder = {
            customer: user._id,
            vendor: getVendor(),
            items: cart[0].items.map(item => item._id),
        }
        
        setLoading('Submitting order...', newOrder)

        const { data } = await axios.
            post('/api/order', newOrder)

        setLoading(null)
        
        if (!data) {
            console.log('Order submission failed')
            return
        }

        onSubmitted(data)
    }

    return cart && cart.length ? (
        <View>
            {cart.map((order, orderIndex) => (
                <CartProductPreview order={order} key={`order-${orderIndex}`} />
            ))}
            
            <View
                style={{ paddingTop: 10, paddingBottom: 7 }}
            >
                <IconButton
                    label='Submit Order'
                    onPress={submitOrder}
                    bgColor='blue'
                    disabled={loading}
                    style={{ marginBottom: 10 }}
                />
                
                <IconButton
                    label='Clear Cart'
                    onPress={() => dispatch({ type: 'CLEAR_CART' })}
                    bgColor='gray'
                    disabled={loading}
                />
            </View>

        </View>
    ) : null
}
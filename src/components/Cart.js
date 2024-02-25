import React, { useContext } from 'react'
import {
    View,
} from 'react-native'
import {
    CartProductPreview,
    IconButton,
} from '.'
import { AppContext } from '../AppContext'
import axios from 'axios'
import { useTheme } from 'react-native-paper'

export default ({ onSubmitted }) => {

    const {
        cart,
        dispatch,
        loading,
        user,
    } = useContext(AppContext)

    const theme = useTheme()

    const submitOrder = async () => {
        const newOrder = {
            customer: user._id,
            items: cart[0].items,
        }
        
        dispatch({ type: 'SET_LOADING', loading: 'Submitting order...' })

        const { data } = await axios.
            post('/api/order', newOrder)

            dispatch({ type: 'SET_LOADING', loading: null })
        
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
                style={{
                    marginTop: 20,
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                    gap: 10,
                }}
            >
                <IconButton
                    label='Order It!'
                    onPress={submitOrder}
                    type='primary'
                    disabled={loading}
                    style={{ flex: 7 }}
                />
                
                <IconButton
                    iconName='close-outline'
                    onPress={() => dispatch({ type: 'CLEAR_CART' })}
                    type='danger'
                    disabled={loading}
                    style={{ flex: 1 }}
                />
            </View>

        </View>
    ) : null
}
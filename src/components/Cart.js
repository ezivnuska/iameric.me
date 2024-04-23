import React, { useContext } from 'react'
import {
    View,
} from 'react-native'
import {
    CartProductPreview,
    IconButton,
} from '.'
import {
    useCart,
    useModal,
    useOrders,
    useAuth,
} from '@context'
import axios from 'axios'

export default () => {
    const {
        cartLoading,
        clearCart,
        items,
        setCartLoading,
    } = useCart()
    const { addOrder } = useOrders()
    const { closeModal } = useModal()
    const { profile } = useAuth()

    const submitOrder = async () => {
        const newOrder = {
            customer: profile._id,
            items,
        }
        setCartLoading(true)
        
        const { data } = await axios.
            post('/api/order', newOrder)
        
        setCartLoading(false)

        if (!data) {
            console.log('Order submission failed')
        } else {
            addOrder(data)
            clearCart()
            closeModal()
        }
    }
    
    return (
        <View>
            <CartProductPreview
                order={{
                    items,
                    customer: profile._id,
                }}
            />
            
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
                    disabled={cartLoading}
                    style={{ flex: 7 }}
                />
                
                <IconButton
                    iconName='close-outline'
                    onPress={clearCart}
                    type='danger'
                    disabled={cartLoading}
                    style={{ flex: 1 }}
                />
            </View>

        </View>
    )
}
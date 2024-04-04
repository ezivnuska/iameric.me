import React, { useContext, useEffect } from 'react'
import {
    View,
} from 'react-native'
import {
    CartProductPreview,
    IconButton,
} from '.'
import {
    AppContext,
    useCart,
    useModal,
    useOrders,
    useUser,
} from '@context'
import axios from 'axios'

export default () => {
    const { profile } = useUser()
    const { clearCart, items } = useCart()
    const { addOrder } = useOrders()
    const { closeModal } = useModal()

    const {
        loading,
    } = useContext(AppContext)

    const submitOrder = async () => {
        const newOrder = {
            customer: profile._id,
            items,
        }

        const { data } = await axios.
            post('/api/order', newOrder)
        
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
                    disabled={loading}
                    style={{ flex: 7 }}
                />
                
                <IconButton
                    iconName='close-outline'
                    onPress={() => clearCart()}
                    type='danger'
                    disabled={loading}
                    style={{ flex: 1 }}
                />
            </View>

        </View>
    )
}
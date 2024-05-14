import React, { useContext } from 'react'
import {
    View,
} from 'react-native'
import {
    CartProductPreview,
    SimpleButton,
} from '.'
import {
    useCart,
    useModal,
    useOrders,
    useUser,
} from '@context'
import { submitOrder } from '@utils/orders'

export default () => {
    const {
        cartLoading,
        clearCart,
        items,
        setCartLoading,
    } = useCart()
    const { addOrder } = useOrders()
    const { closeModal } = useModal()
    const { profile } = useUser()

    const submit = async () => {
        const newOrder = {
            customer: profile._id,
            items,
        }
        setCartLoading(true)
        const order = await submitOrder(newOrder)
        setCartLoading(false)

        if (!order) {
            console.log('Order submission failed')
        } else {
            addOrder(order)
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
                <SimpleButton
                    label='Submit Payment'
                    onPress={submit}
                    disabled={cartLoading}
                    style={{ flex: 7 }}
                />

            </View>

        </View>
    )
}
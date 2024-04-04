import React from 'react'
import {
    Cart,
} from '.'
import { useCart, useModal, useOrders } from '@context'
import { navigationRef } from 'src/navigation/RootNavigation'

export default () => {

    const { items } = useCart()
    const { addOrder } = useOrders()
    const { closeModal } = useModal()

    const onSubmitted = order => {
        console.log('Hay', order)
        addOrder(order)
        
        closeModal()
        
        navigationRef.navigate('Orders')
    }
    
    return (
        <Cart onSubmitted={onSubmitted} />
    )
}
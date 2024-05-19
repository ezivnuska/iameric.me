import React, { useEffect } from 'react'
import {
    FlatList,
} from 'react-native'
import {
    EmptyStatus,
} from '@components'
import {
    VendorMenuItem,
} from './components'
import {
    useApp,
    useCart,
} from '@context'

export default ({ vendor }) => {
    
    const { userId } = useApp()
    const { addToCart, itemPending, setItemPending } = useCart()

    useEffect(() => {
        if (userId && itemPending) {
            addToCart(itemPending.item, itemPending.quantity)
            setItemPending(null)
        }
    }, [userId])

    return vendor.products && vendor.products.length
        ? (
            <FlatList
                data={vendor.products}
                keyExtractor={item => `product-${item._id}`}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => <VendorMenuItem item={item} />}
            />
        )
        : <EmptyStatus status='No products listed.' />
} 
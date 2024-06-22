import React, { useEffect } from 'react'
import { FlatList } from 'react-native'
import { EmptyStatus } from '@components'
import { MenuItem } from './components'
import {
    useApp,
    useCart,
} from '@context'
import { navigationRef } from '@utils/navigate'

export default ({ products, loading }) => {
    
    const { userId } = useApp()
    const { addToCart, itemPending, setItemPending } = useCart()

    useEffect(() => {
        if (userId && itemPending) {
            addToCart(itemPending.item, itemPending.quantity)
            setItemPending(null)
            navigationRef.navigate('Main', { screen: 'Vendors', params: { screen: 'Vendor', params: { id: itemPending.item.vendor._id } } })
        }
    }, [userId])

    return products && products.length
        ? (
            <FlatList
                data={products}
                keyExtractor={item => `product-${item._id}`}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => <MenuItem item={item} />}
            />
        )
        : <EmptyStatus status='No products listed.' />
}
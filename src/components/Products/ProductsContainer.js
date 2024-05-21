import React from 'react'
import { FlatList } from 'react-native'
import {
    EmptyStatus,
    LoadingView,
} from '@components'
import { ProductListItem } from './components'
import { useProducts } from '@context'

export default () => {

    const {
        products,
        productsLoading,
    } = useProducts()

    if (productsLoading) return <LoadingView loading='Loading products' />
    
    return products.length ? (
        <FlatList
            showsVerticalScrollIndicator={false}
            data={products}
            listKey={() => 'products'}
            keyExtractor={(item, index) => 'key' + index}
            renderItem={({ item }) => (
                <ProductListItem
                    product={item}
                    key={item => `product-${item._id}`}
                />
            )}
        />
    ) : <EmptyStatus status='Nothing currently listed.' />
}
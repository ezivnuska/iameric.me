import React from 'react'
import { FlatList } from 'react-native'
import {
    EmptyStatus,
    LoadingView,
} from '@components'
import { ProductListItem } from './components'

export default ({ loading, products }) => {

    if (loading) return <LoadingView loading='Loading products...' />
    
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
import React from 'react'
import {
    FlatList,
} from 'react-native'
import {
    LoadingView,
    MenuItem,
    EmptyStatus,
} from '.'

export default ({ loading, products, vendor }) => {
    
    if (loading) return <LoadingView />

    return products && products.length
        ? (
            <FlatList
                data={products}
                keyExtractor={item => `product-${item._id}`}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <MenuItem
                        item={item}
                        username={vendor.username}
                    />
                )}
            />
        )
        : <EmptyStatus status='There are no available products at this time.' />
}
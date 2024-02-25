import React from 'react'
import {
    FlatList,
} from 'react-native'
import {
    ThemedText,
    LoadingView,
    MenuItem,
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
        : (
            <ThemedText style={{ paddingHorizontal: 10 }}>
                There are no available products at this time.
            </ThemedText>
        )
}
import React from 'react'
import { FlatList } from 'react-native'
import { ProductListItem } from '.'

export default ({ deleteItem, products, onPress, update }) => (
    <FlatList
        data={products}
        listKey={() => 'products'}
        keyExtractor={(item, index) => 'key' + index}
        renderItem={({ item }) => (
            <ProductListItem
                product={item}
                key={item => `product-${item._id}`}
                update={update}
                onDelete={() => deleteItem(item._id)}
                onPress={() => onPress(item)}
            />
        )} 
    />
)
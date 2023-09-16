import React from 'react'
import {
    FlatList,
} from 'react-native'
import {
    ProductListItem,
} from '.'

const ProductList = ({ deleteItem, items, onPress, update }) => (
    <FlatList
        data={items}
        listKey={() => 'products'}
        keyExtractor={item => `product-${item._id}`}
        renderItem={({ item }) => (
            <ProductListItem
                item={item}
                update={update}
                onDelete={() => deleteItem(item._id)}
                onPress={() => onPress(item)}
            />
        )} 
    />
)

export default ProductList
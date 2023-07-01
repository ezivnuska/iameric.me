import React from 'react'
import {
    FlatList,
} from 'react-native'
import { ProductListItem } from '.'

const ProductList = ({ deleteItem, items }) => (
    <FlatList
        data={items}
        listKey={() => 'products'}
        keyExtractor={(item, index) => 'product' + index}
        renderItem={({ item }) => {
            return (
                <ProductListItem
                    item={item}
                    onDelete={() => deleteItem(item._id)}
                />
            )
        }} 
    />
)

export default ProductList
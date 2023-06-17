import React from 'react'
import {
    FlatList,
} from 'react-native'
import { ProductListItem } from '.'

const ProductList = ({ deleteItem, items }) => (
    <FlatList
        data={items}
        keyExtractor={(item, index) => index}
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
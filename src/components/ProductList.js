import React from 'react'
import {
    FlatList,
} from 'react-native'
import {
    ProductListItem,
} from '.'

const ProductList = ({ deleteItem, productIds, onPress, update }) => (
    <FlatList
        data={productIds}
        listKey={() => 'products'}
        keyExtractor={id => `product-${id}`}
        renderItem={({ item }) => (
            <ProductListItem
                productId={item}
                key={item => `product-${item}`}
                update={update}
                onDelete={() => deleteItem(item)}
                onPress={() => onPress(item)}
            />
        )} 
    />
)

export default ProductList
import React from 'react'
import {
    FlatList,
    Pressable,
    Text,
} from 'react-native'

export default ({ onSelect, products, imageId }) => (
    <FlatList
        data={products}
        listKey={() => 'products'}
        keyExtractor={(item, index) => 'key' + index}
        renderItem={({ item }) => (
            <Pressable
                product={item}
                key={item => `product-${item._id}`}
                onPress={() => onSelect(item._id)}
                style={{
                    padding: 10,
                }}
                disabled={item.image && imageId === item.image._id}
            >
                <Text>{item.title}</Text>
            </Pressable>
        )} 
    />
)
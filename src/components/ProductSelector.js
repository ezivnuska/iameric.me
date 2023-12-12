import React from 'react'
import {
    FlatList,
    Pressable,
    Text,
} from 'react-native'
// import { Button } from 'antd'

export default ({ onSelect, products, imageId }) => (
    <FlatList
        data={products}
        listKey={() => 'products'}
        keyExtractor={(item, index) => 'key' + index}
        renderItem={({ item }) => (
            <Pressable
                type='primary'
                key={item => `product-${item._id}`}
                onPress={() => onSelect(item._id)}
                style={{
                    padding: 10,
                    borderWidth: 1,
                    borderColor: '#fff',
                    borderRadius: 10,
                }}
                disabled={item.image && imageId === item.image._id}
            >
                <Text style={{ color: '#fff' }}>{item.title}</Text>
            </Pressable>
        )}
    />
)
import React from 'react'
import {
    FlatList,
    Pressable,
    Text,
} from 'react-native'
import { useApp } from '@context'

export default ({ onSelect, products, imageId }) => {
    
    const { theme } = useApp()

    return (
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
                        marginTop: 10,
                        padding: 10,
                        borderWidth: 1,
                        borderColor: theme?.colors.borderColor,
                        borderRadius: 10,
                    }}
                    disabled={item.image && imageId === item.image._id}
                >
                    <Text style={{ color: theme?.colors.textDefault }}>{item.title}</Text>
                </Pressable>
            )}
        />
    )
}
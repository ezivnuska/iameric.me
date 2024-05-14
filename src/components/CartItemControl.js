import React from 'react'
import {
    Pressable,
    View,
} from 'react-native'
import { useCart } from '@context'
import Icon from 'react-native-vector-icons/Ionicons'

export default ({ count, id }) => {

    const { removeOne } = useCart()
    
    return (
        <View
            style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 10,
            }}
        >
            
            <Pressable onPress={() => removeOne(id)}>
                <Icon name={`${count > 1 ? 'remove' : 'trash'}-outline`} style={{ fontSize: 32 }} />
            </Pressable>
            
            <Pressable onPress={() => addToCart(id)}>
                <Icon name='add-outline' style={{ fontSize: 32 }} />
            </Pressable>

        </View>
    )
}
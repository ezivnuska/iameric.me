import React, { useContext, useEffect, useState } from 'react'
import {
    ActivityIndicator,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import { ItemizedListItem } from '.'
import axios from 'axios'
import { AppContext } from '../AppContext'

const ItemizedList = ({ order }) => {
    
    const {
        dispatch,
    } = useContext(AppContext)

    const { vendor, _id } = order

    const [loading, setLoading] = useState(false)
    const [items, setItems] = useState(order.items)

    // useEffect(() => {
    //     console.log('ORDER', order)
    // }, [])

    const removeItem = id => {
        setItems(items.filter(item => item != id))
    }

    const removeOrder = id => {
        dispatch({ type: 'REMOVE_ORDER', id })
    }

    const deleteOrder = async id => {
        setLoading(true)
        const { data: { order } } = await axios.delete(`/api/order/${id}`)
        removeItem(id)
        removeOrder(id)
        setLoading(false)
    }

    return (
        <View style={styles.container}>
            <Text style={styles.vendorName}>{vendor.username}</Text>
            <FlatList
                data={items}
                listKey={() => 'products'}
                keyExtractor={(item, index) => 'product' + index}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => deleteOrder(_id)}
                        disabled={loading}
                    >
                        <ItemizedListItem
                            item={item}
                        />
                    </TouchableOpacity>
                )} 
            />
        </View>
    )   
}

export default ItemizedList

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 5,
        paddingVertical: 5,
        borderWidth: 1,
        borderStyle: 'dotted',
    },
    vendorName: {
        fontSize: 18,
        lineHeight: 24,
        fontWeight: 600,
    },
})
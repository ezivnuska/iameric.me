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
import defaultStyles from '../styles'

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

    const getOrderTotal = () => {
        let total = 0
        items.map(item => total += Number(item.price))
        return total.toFixed(2)
    }

    const getOrderStatus = () => {
        let status = null
        switch(order.status) {
            case 0: status = 'Pending'; break
            case 1: status = 'Confirmed'; break
            case 2: status = 'Accepted'; break
            case 3: status = 'Picked Up'; break
            case 4: status = 'Delivered'; break
        }
        return status
    }

    return (
        <View style={styles.container}>
            <Text style={styles.vendorName}>{vendor.username} ({getOrderStatus()})</Text>
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
            <View style={styles.totalContainer}>
                <Text style={[defaultStyles.text, styles.label]}>Total:</Text>
                <Text style={[defaultStyles.text, styles.total]}>${getOrderTotal()}</Text>
            </View>
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
    totalContainer: {
        display: 'flex',
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        // marginTop: 7,
        paddingVertical: 2,
        // paddingBottom: 5,
    },
    label: {
        flex: 1,
        flexBasis: '70%',
        flexShrink: 0,
        flexGrow: 1,
        fontSize: 18,
        fontWeight: 500,
    },
    total: {
        flex: 1,
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: '30%',
        textAlign: 'right',
        fontSize: 18,
        fontWeight: 500,
        color: '#666',
    },
})
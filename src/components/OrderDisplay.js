import React, { useContext, useEffect, useState } from 'react'
import {
    ActivityIndicator,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import { ItemizedList } from '.'
import axios from 'axios'
import { AppContext } from '../AppContext'

const OrderDisplay = () => {

    const {
        orders,
    } = useContext(AppContext)

    const [items, setItems] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getOrders()
    }, [])

    useEffect(() => {
        getOrders()
    }, [orders])

    const getOrders = async () => {
        setLoading(true)
        
        const { data } = await axios.get('/api/orders')
        setLoading(false)
        
        if (!data.orders) console.log('no orders found')
        
        setItems(data.orders)
    }

    return loading
        ? <ActivityIndicator size='small' />
        : (items && items.length)
            ? (
                <View>
                    <Text style={styles.heading}>Orders</Text>
                    <FlatList
                        data={items}
                        listKey={() => 'products'}
                        keyExtractor={(item, index) => 'product' + index}
                        renderItem={({ item }) => (
                            <ItemizedList
                                order={item}
                            />
                        )} 
                    />
                </View>
            )
            : null
}

export default OrderDisplay

const styles = StyleSheet.create({
    container: {

    },
    heading: {
        marginVertical: 10,
        fontSize: 18,
        lineHeight: 22,
        fontWeight: 600,
    },
})
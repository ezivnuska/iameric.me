import React, { useContext, useEffect, useState } from 'react'
import {
    FlatList,
    StyleSheet,
    Text,
    View,
} from 'react-native'
import { ButtonPrimary } from '.'
import { AppContext } from '../AppContext'
import axios from 'axios'

const Item = ({ item }) => {
    const { title, price } = item
    return (
        <View style={styles.item}>
            <Text style={styles.text}>{title}</Text>
            <Text style={styles.value}>${price}</Text>
        </View>
    )
}

const Cart = ({ onSubmitOrder }) => {

    const {
        dispatch,
        state,
        user,
        cart,
    } = useContext(AppContext)

    const [loading, setLoading] = useState(false)

    const getTotal = () => {
        let total = 0
        cart.items.map(i => total += Number(i.price))
        return String(total)
    }

    const submitOrder = async () => {
        const { items, vendor } = cart
        const newOrder = {
            customer: user._id,
            vendor,
            items: items.map(item => item._id),
        }
        
        setLoading(true)

        const { data } = await axios.
            post('/api/order', newOrder)

        setLoading(false)
        
        if (!data) {
            console.log('Order submission failed')
            return
        }
        
        dispatch({ type: 'ADD_ORDER', order: data })

        onSubmitOrder()
    }

    return cart.items ? (
        <View style={styles.container}>
            <FlatList
                style={styles.cart}
                data={cart.items}
                keyExtractor={(item, index) => index}
                renderItem={({ item }) => <Item item={item} />} 
            />
            <View style={styles.flexContainer}>
                <Text style={[styles.text, styles.total]}>Total:</Text>
                <Text style={[styles.value, styles.total]}>${getTotal()}</Text>
            </View>

            <ButtonPrimary
                label='Clear Cart'
                onPress={() => dispatch({ type: 'CLEAR_CART' })}
            />

            <ButtonPrimary
                label='Submit Order'
                onPress={submitOrder}
                disabled={loading}
            />
        </View>
    ) : null
}

export default Cart

const styles = StyleSheet.create({
    container: {
        paddingBottom: 10,
    },
    cart: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingBottom: 10,
    },
    flexContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
    },
    item: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 10,
    },
    text: {
        flexBasis: '80%',
        flexGrow: 1,
        flexShrink: 0,
    },
    value: {
        flexBasis: 'auto',
        flexGrow: 0,
        flexShrink: 1,
    },
    total: {
        fontWeight: 700,
    },
})
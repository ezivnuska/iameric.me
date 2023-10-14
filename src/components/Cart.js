import React, { useContext, useEffect, useState } from 'react'
import {
    FlatList,
    StyleSheet,
    Text,
    View,
} from 'react-native'
import { AppContext } from '../AppContext'
import main from '../styles/main'
import axios from 'axios'
import { Button } from 'antd'

const Cart = ({ onSubmitOrder }) => {

    const {
        dispatch,
        user,
        cart,
    } = useContext(AppContext)

    const [loading, setLoading] = useState(false)

    const getTotal = () => {
        let total = 0
        cart.items.map(i => total += Number(i.price))
        return String(total.toFixed(2))
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
        <View>
            <FlatList
                style={styles.cart}
                data={cart.items}
                keyExtractor={(item, index) => index}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Text style={[main.text, styles.text]}>{item.title}</Text>
                        <Text style={[main.text, styles.value]}>${item.price}</Text>
                    </View>
                )} 
            />
            <View style={styles.flexContainer}>
                <Text style={[main.text, styles.text, styles.total]}>Total:</Text>
                <Text style={[main.text, styles.value, styles.total]}>${getTotal()}</Text>
            </View>

            <Button
                type='primary'
                onClick={submitOrder}
                disabled={loading}
                style={{ marginBottom: 10 }}
            >
                Submit Order
            </Button>

            <Button
                type='default'
                onClick={() => dispatch({ type: 'CLEAR_CART' })}
                disabled={loading}
                style={{ marginBottom: 10 }}
            >
                Clear Cart
            </Button>

        </View>
    ) : null
}

export default Cart

const styles = StyleSheet.create({
    cart: {
        // borderBottomWidth: 1,
        // borderBottomColor: '#ccc',
        // paddingBottom: 10,
        paddingBottom: 10,
    },
    flexContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 10,
    },
    item: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
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
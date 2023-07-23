import React, { useContext, useEffect } from 'react'
import {
    FlatList,
    StyleSheet,
    Text,
    View,
} from 'react-native'
import { ButtonPrimary } from '.'
import { AppContext } from '../AppContext'

const Item = ({ item }) => {
    const { title, price } = item
    return (
        <View style={styles.item}>
            <Text style={styles.text}>{title}</Text>
            <Text style={styles.value}>${price}</Text>
        </View>
    )
}

const Cart = ({ items }) => {

    const { dispatch } = useContext(AppContext)

    const getTotal = () => {
        let total = 0
        items.map(i => total += Number(i.price))
        return String(total)
    }

    return items.length ? (
        <View style={styles.container}>
            <FlatList
                style={styles.cart}
                data={items}
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
        paddingBottom: 5,
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
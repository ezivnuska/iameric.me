import React from 'react'
import {
    StyleSheet,
    Text,
    View,
} from 'react-native'

const MenuItem = ({ item, ...props }) => {
    const { _id, price, title, desc, vendorId } = item
    return (
        <View style={styles.container} {...props}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.price}>${price}</Text>
            <Text style={styles.desc}>{desc}</Text>
        </View>
    )
}

export default MenuItem

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        marginBottom: 5,
        paddingBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    title: {
        flex: 1,
        flexBasis: 'auto',
        flexGrow: 1,
    },
    price: {
        fontSize: 16,
        lineHeight: 24,
        fontWeight: 700,
        marginTop: 2, 
        color: '#999',
    },
    desc: {

    },
})
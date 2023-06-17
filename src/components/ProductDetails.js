import React from 'react'
import {
    StyleSheet,
    Text,
    View,
} from 'react-native'

const ProductDetails = ({ product }) => {
    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <Text style={styles.title}>Title:</Text>
                <Text style={styles.price}>{product.title}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.title}>Price:</Text>
                <Text style={styles.price}>${product.price}</Text>
            </View>
        </View>
    )
}

export default ProductDetails

const styles = StyleSheet.create({
    container: {

    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    title: {
        flex: 1,
    },
    price: {
        flex: 1,
    },
})
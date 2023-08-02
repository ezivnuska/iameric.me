import React from 'react'
import {
    StyleSheet,
    Text,
    View,
} from 'react-native'
import {
    ButtonPrimary
} from '.'
import defaultStyles from '../styles'

const ProductDetails = ({ product, onOrder }) => {
    const { _id, title, price, desc, vendorId, blurb, category } = product

    return (
        <View style={styles.container}>
            <View style={styles.details}>
                <Text style={[defaultStyles.text, styles.blurb]}>{blurb}</Text>
                <Text style={[defaultStyles.text, styles.desc]}>{desc}</Text>
                <Text style={[defaultStyles.text, styles.price]}>${price}</Text>
            </View>
            <ButtonPrimary
                label='Order'
                onPress={() => onOrder(product)}
            />
        </View>
    )
}

export default ProductDetails

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginBottom: 12,
        paddingBottom: 10,
    },
    details: {
        marginBottom: 7,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    blurb: {
        fontSize: 20,
        fontWeight: 600,
        color: '#777',
    },
    desc: {
        marginVertical: 10,
        fontWeight: 18,
        paddingHorizontal: 5,
    },
    price: {
        textAlign: 'right',
        marginBottom: 10,
        fontSize: 18,
        fontWeight: 700,
        color: '#666',
    },
})
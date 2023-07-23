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
            <View style={styles.flexContainer}>
                <Text style={[defaultStyles.text, styles.title]}>{title}</Text>
                <Text style={[defaultStyles.text, styles.price]}>${price}</Text>
            </View>
            <Text style={[defaultStyles.text, styles.blurb]}>{blurb}</Text>
            <Text style={[defaultStyles.text, styles.desc]}>{desc}</Text>
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
    flexContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 7,
    },
    title: {
        flex: 4,
        flexBasis: '80%',
        flexGrow: 1,
        fontSize: 18,
        fontWeight: 700,
    },
    price: {
        flex: 1,
        flexBasis: '20%',
        textAlign: 'right',
        fontSize: 18,
        fontWeight: 700,
        color: '#666',
    },
    blurb: {
        
    },
    desc: {
        
    },
})
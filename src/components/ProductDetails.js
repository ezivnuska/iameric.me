import React from 'react'
import {
    StyleSheet,
    Text,
    View,
} from 'react-native'
import {
    ButtonPrimary,
    CenteredView,
    PanelView,
} from '.'
import main from '../styles/main'

const ProductDetails = ({ product, onOrder }) => product ? (
    <View style={main.paddedH}>
        <View style={styles.columns}>
            <View style={styles.main}>
                {product.blurb && <Text style={[main.text, main.bold]}>{product.blurb}</Text>}
                <Text style={[main.text]}>{product.desc}</Text>
            </View>
            <View style={styles.aside}>
                <Text style={[main.text, main.bold]}>${product.price}</Text>
            </View>
        </View>

        <ButtonPrimary
            label='Add to Cart'
            onPress={() => onOrder(product)}
        />
    </View>
) : null

export default ProductDetails

const styles = StyleSheet.create({
    columns: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginBottom: 10,
    },
    main: {
        flexBasis: 'auto',
        flexGrow: 1,
    },
    aside: {
        flexBasis: '20%',
        flexGrow: 0,
        textAlign: 'right',
    },
})
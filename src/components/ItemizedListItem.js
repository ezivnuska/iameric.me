import React from 'react'
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import defaultStyles from '../styles'

const ItemizedListItem = ({ item, onPress }) => {
    const { _id, price, title, desc, vendorId, blurb, category } = item

    return (
        <View style={styles.container}>
            <Text style={[defaultStyles.text, styles.title]}>{title}</Text>
            <Text style={[defaultStyles.text, styles.price]}>${price}</Text>
        </View>
    )
}

export default ItemizedListItem

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        // marginTop: 7,
        paddingVertical: 2,
        // paddingBottom: 5,
    },
    title: {
        flex: 1,
        flexBasis: '70%',
        flexShrink: 0,
        flexGrow: 1,
        fontSize: 18,
        fontWeight: 500,
    },
    price: {
        flex: 1,
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: '30%',
        textAlign: 'right',
        fontSize: 18,
        fontWeight: 500,
        color: '#666',
    },
    blurb: {
        fontSize: 20,
        color: '#777',
        fontWeight: 600,
    },
    desc: {
        marginVertical: 10,
        fontSize: 18,
    },
})
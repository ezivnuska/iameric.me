import React from 'react'
import {
    StyleSheet,
    Text,
    View,
} from 'react-native'

const OrderDetails = ({ order }) => {
    return (
        <View style={styles.container}>
            <View>
                <Text>Date:</Text>
                <Text>{order.date}</Text>
            </View>
            <View>
                <Text>Vendor:</Text>
                <Text>{order.vendor}</Text>
            </View>
        </View>
    )
}

export default OrderDetails

const styles = StyleSheet.create({
    container: {

    },
})
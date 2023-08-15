import React from 'react'
import {
    StyleSheet,
    Text,
    View,
} from 'react-native'

const OrderDetails = ({ order }) => {
    console.log('order', order)
    return (
        <View style={styles.container}>
            <Text>{`Date: ${order.date}`}</Text>
            <Text>{`Vendor: ${order.vendor.username}`}</Text>
            <Text>{`Customer: ${order.customer.username}`}</Text>
            {order.driver ? <Text>{`Driver: ${order.driver.username}`}</Text> : null}
        </View>
    )
}

export default OrderDetails

const styles = StyleSheet.create({
    container: {

    },
})
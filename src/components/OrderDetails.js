import React from 'react'
import {
    StyleSheet,
    Text,
    View,
} from 'react-native'

const OrderDetails = ({ order }) => {
    const { date, customer, driver, vendor } = order
    return (
        <View style={styles.container}>
            <Text>{`Date: ${date}`}</Text>
            <Text>{`Vendor: ${vendor.username}`}</Text>
            <Text>{`Customer: ${customer.username}`}</Text>
            {order.driver ? <Text>{`Driver: ${driver.username}`}</Text> : null}
        </View>
    )
}

export default OrderDetails

const styles = StyleSheet.create({
    container: {

    },
})
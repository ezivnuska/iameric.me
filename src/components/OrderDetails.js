import React from 'react'
import {
    StyleSheet,
    Text,
    View,
} from 'react-native'
import moment from 'moment'

const OrderDetails = ({ order }) => {
    const { date, customer, driver, vendor } = order
    return (
        <View style={styles.container}>
            <Text>{`${moment(date).format('dddd, MMMM Do LT')}`}</Text>
            <Text>{`From ${vendor.username}`}</Text>
            <Text>{`To ${customer.username}`}</Text>
            {order.driver ? <Text>{`Assigned to ${driver.username}`}</Text> : null}
        </View>
    )
}

export default OrderDetails

const styles = StyleSheet.create({
    container: {

    },
})
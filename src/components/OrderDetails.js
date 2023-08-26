import React from 'react'
import {
    StyleSheet,
    Text,
    View,
} from 'react-native'
import moment from 'moment'

const OrderDetails = ({ order }) => {
    const { dropoff, customer, driver, vendor } = order
    return (
        <View style={styles.container}>
            <Text>{`From ${vendor.username}`}</Text>
            <Text>{`To ${customer.username}`}</Text>
            {order.driver ? <Text>{`Assigned to ${driver.username}`}</Text> : null}
            <Text>Deliver by: {`${moment(dropoff).format('dddd, MMMM Do LT')}`}</Text>
        </View>
    )
}

export default OrderDetails

const styles = StyleSheet.create({
    container: {

    },
})
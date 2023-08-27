import React, { useContext, useEffect, useState } from 'react'
import {
    StyleSheet,
    Text,
    View,
} from 'react-native'
import {
    LocationDetails,
} from '.'
import defaultStyles from '../styles'
import moment from 'moment'
import { AppContext } from '../AppContext'

const OrderDetails = ({ order }) => {
    
    const { dropoff, customer, driver, vendor } = order

    const {
        user,
    } = useContext(AppContext)

    const renderLocation = () => {
        if (user.role === 'vendor') return null
        if (user.role === 'driver' && order.status < 2) return null
        return <LocationDetails location={customer.location} style={{ color: '#000' }} />
    }

    const renderCustomerInfo = () => (
        <View style={styles.locationContainer}>
            <Text style={defaultStyles.text}>{`Deliver to ${customer.username}`}</Text>
            {renderLocation()}
        </View>
    )

    return (
        <View style={styles.container}>
            <View style={styles.locationContainer}>
                <Text style={defaultStyles.text}>{`Pick up from ${vendor.username}`}</Text>
                <LocationDetails location={vendor.location} style={{ color: '#333' }} />
            </View>
            {renderCustomerInfo()}
            
            {order.driver ? <Text style={defaultStyles.text}>{`Assigned to ${driver.username}`}</Text> : null}
            <Text style={styles.deadline}>Deliver by {`${moment(dropoff).format('LT')}`}</Text>
        </View>
    )
}

export default OrderDetails

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
    },
    locationContainer: {
        marginBottom: 10,
    },
    deadline: {
        fontWeight: 600,
    }
})
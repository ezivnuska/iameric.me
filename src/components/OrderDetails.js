import React, { useContext, useEffect, useState } from 'react'
import {
    StyleSheet,
    Text,
    View,
} from 'react-native'
import {
    DefaultText,
    LocationDetails,
} from '.'
import defaultStyles from '../styles/main'
import moment from 'moment'
import { AppContext } from '../AppContext'

const OrderDetails = ({ order }) => {
    
    const { pickup, customer, driver, vendor } = order

    const {
        user,
    } = useContext(AppContext)

    const renderLocation = () => {
        if (user.role === 'vendor') return null
        if (user.role === 'driver' && order.status < 2) return null
        return <LocationDetails location={customer.location} style={{ color: '#000' }} />
    }

    const getPickupTime = () => moment(pickup).format('LT')
    const getDeliveryTime = () => moment(pickup).add(20, 'm').format('LT')

    const renderCustomerInfo = () => (
        <View style={styles.locationContainer}>
            <DefaultText>{`Deliver to ${customer.username}`}</DefaultText>
            {renderLocation()}
        </View>
    )

    const renderVendorInfo = () => (
        <View style={styles.locationContainer}>
            <DefaultText style={defaultStyles.subheading}>{`Pick up from ${vendor.username} by ${getPickupTime()}`}</DefaultText>
            <LocationDetails location={vendor.location} />
        </View>
    )

    const renderDriverInfo = () => driver ? (
        <View>
            <Text style={defaultStyles.text}>{`Assigned to ${driver.username}`}</Text>
            <DefaultText>Deliver by {`${getDeliveryTime()}`}</DefaultText>
        </View>
    ) : <DefaultText>Looking for driver...</DefaultText>

    const renderDetails = () => user.role !== 'vendor'
        ? (
            <View>
                {renderVendorInfo()}
                {renderCustomerInfo()}
                {renderDriverInfo()}
            </View>
        ) : null

    return (
        <View style={styles.container}>
            {renderDetails()}
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
})
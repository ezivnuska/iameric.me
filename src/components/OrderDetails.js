import React, { useContext } from 'react'
import {
    View,
} from 'react-native'
import {
    ThemedText,
    LocationDetails,
} from '.'
import moment from 'moment'
import { AppContext } from '../AppContext'
import classes from 'src/styles/classes'

export default ({ order }) => {
    
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
        <View style={{ marginBottom: 10 }}>
            <ThemedText bold>{`Deliver to ${customer.username}`}</ThemedText>
            {renderLocation()}
        </View>
    )

    const renderVendorInfo = () => (
        <View style={{ marginBottom: 10 }}>
            <ThemedText style={classes.headerSecondary}>
                {`Pick up from ${vendor.username} by ${getPickupTime()}`}
            </ThemedText>

            <LocationDetails location={vendor.location} />
        </View>
    )

    const renderDriverInfo = () => driver ? (
        <View>
            <ThemedText bold>{`Assigned to ${driver.username}`}</ThemedText>
            <ThemedText>Deliver by {`${getDeliveryTime()}`}</ThemedText>
        </View>
    ) : <ThemedText>Looking for driver...</ThemedText>

    const renderDetails = () => user.role !== 'vendor'
        ? (
            <View>
                {renderVendorInfo()}
                {renderCustomerInfo()}
                {renderDriverInfo()}
            </View>
        ) : null

    return (
        <View style={{ marginBottom: 10 }}>
            {renderDetails()}
        </View>
    )
}
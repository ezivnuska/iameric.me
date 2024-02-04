import React, { useContext } from 'react'
import {
    Text,
    View,
} from 'react-native'
import {
    DefaultText,
    LocationDetails,
} from '.'
import main from '../styles/main'
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
            <DefaultText bold>{`Deliver to ${customer.username}`}</DefaultText>
            {renderLocation()}
        </View>
    )

    const renderVendorInfo = () => (
        <View style={{ marginBottom: 10 }}>
            <DefaultText style={classes.headerSecondary}>
                {`Pick up from ${vendor.username} by ${getPickupTime()}`}
            </DefaultText>

            <LocationDetails location={vendor.location} />
        </View>
    )

    const renderDriverInfo = () => driver ? (
        <View>
            <DefaultText bold>{`Assigned to ${driver.username}`}</DefaultText>
            <DefaultText>Deliver by {`${getDeliveryTime()}`}</DefaultText>
        </View>
    ) : <Text style={main.text}>Looking for driver...</Text>

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
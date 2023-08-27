import React, { useContext, useEffect } from 'react'
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import {
    CountdownTimer, LocationDetails,
} from '.'

import { AppContext } from '../AppContext'
import defaultStyles from '../styles'
import moment from 'moment'
import { Button } from 'antd'

const OrderPreview = ({ order, onPress, ...props }) => {

    const {
        user,
    } = useContext(AppContext)

    const {
        _id,
        confirmed,
        accepted,
        customer,
        date,
        driver,
        items,
        vendor,
        status,
        delivered,
        pickup,
        received,
    } = order

    const colors = [
        'pink',
        'lightblue',
        'green',
        'orange',
        '#eee',
    ]

    const statusLabels = [
        'Submitted',
        'Confirmed',
        'Accepted',
        'Picked Up',
        'Delivered',
    ]

    const textColor = () => order.status >= 4 ? '#aaa' : '#000'

    const backgroundColor = () => colors[order.status]

    // useEffect(() => {
    //     console.log('order', order)
    // }, [])

    const getCompletedStyles = () => order.status >= 4 ? {
        borderWidth: 2,
        borderStyle: 'dashed',
        borderColor: '#aaa',
    } : null

    const modalDisabled = () => {
        if (user.role == 'customer' && status < 4) return false
        if (user.role == 'vendor' && (status == 0 || status == 4)) return false
        if (user.role == 'driver' && (status > 0)) return false
        return true
    }

    const renderCustomer = () => customer
        ? (
            <View style={styles.column}>
                <Text style={[styles.heading, { color: textColor() }]}>{customer.username}</Text>
                <LocationDetails location={customer.location} style={{ color: textColor()}} />
            </View>
        ) : null
    
    const renderVendor = () => vendor
        ? (
            <View style={styles.column}>
                <Text style={[styles.heading, { color: textColor() }]}>{`${vendor.username} (${items.length} ${items.length > 1 ? 'items' : 'item'})`}</Text>
                <LocationDetails location={vendor.location} style={{ color: textColor()}} />
            </View>
        ) : null

    return (
        <View
            style={[
                props.style,
                getCompletedStyles(),
                {
                    backgroundColor: backgroundColor(),
                },
            ]}
        >
            <Text style={[styles.text, { color: textColor()}]}>
                {`${statusLabels[status]} on ${moment(order.date).format('ddd, MMM Do LT')}`}
            </Text>

            <Text style={[styles.text, { color: textColor()}]}>{moment(date).format('dddd, MMMM Do LT')}</Text>
            
            {pickup && <Text style={[styles.text, { color: textColor(), fontWeight: 600 }]}>{`Ready for pick up at ${moment(pickup).format('LT')}`}</Text>}

            {received && <Text style={[styles.text, { color: textColor()}]}>{moment(received).format('dddd, MMMM Do LT')}</Text>}
            
            {delivered && <Text style={[styles.text, { color: textColor()}]}>{`Delivered: ${moment(delivered).format('dddd, MMMM Do LT')}`}</Text>}

            <View style={styles.columns}>
                {renderVendor()}
                {renderCustomer()}
            </View>

            <Button
                type='primary'
                size='small'
                onClick={() => onPress(_id)}
                style={styles.button}
            >   
                Details &amp; Options
            </Button>

        </View>
    )
}

export default OrderPreview

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexGrow: 1,
        flexShrink: 0,
        flexBasis: 'auto',
        maxWidth: '30%',
        marginBottom: 10,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 4,
    },
    columns: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'stretch',
        marginTop: 5,
        marginBottom: 10,
    },
    column: {
        flex: 1,
    },
    heading: {
        marginBottom: 3,
        fontWeight: 600,
    },
    text: {
        lineHeight: 24,
    },
    button: {
        height: 40,
    },
})
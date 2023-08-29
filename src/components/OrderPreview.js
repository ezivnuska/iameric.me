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
        accepted,
        arrived,
        confirmed,
        customer,
        date,
        delivered,
        driver,
        items,
        pickup,
        received,
        status,
        vendor,
    } = order

    const colors = [
        'pink',
        'lightblue',
        'turquoise',
        'yellow',
        'orange',
        '#eee',
    ]

    const statusLabels = [
        'Ordered',
        'Confirmed',
        'Accepted',
        'Arrived',
        'Picked Up',
        'Delivered',
    ]

    const textColor = () => order.status === 5 ? '#aaa' : '#000'

    const backgroundColor = () => colors[order.status]

    // useEffect(() => {
    //     console.log('order', order)
    // }, [])

    const getCompletedStyles = () => order.status === 5 ? {
        borderWidth: 2,
        borderStyle: 'dashed',
        borderColor: '#aaa',
    } : null

    const showOptionsButton = () => {
        if (user.role === 'customer' && (status === 0 || status === 5)) return true
        else if (user.role == 'vendor' && status === 0) return true
        else if (user.role == 'driver' && status >= 1 && status < 5) return true

        return false
    }

    const renderLocation = () => {
        if (user.role === 'vendor') return null
        if (user.role === 'driver' && order.status < 2) return null
        return <LocationDetails location={customer.location} style={{ color: textColor()}} />
    }

    const renderCustomer = () => (
        <View style={styles.column}>
            <Text style={[styles.heading, { color: textColor() }]}>{customer.username}</Text>
            {renderLocation()}
        </View>
    )
    
    const renderVendor = () => (
        <View style={styles.column}>
            <Text style={[styles.heading, { color: textColor() }]}>{`${vendor.username} (${items.length} ${items.length > 1 ? 'items' : 'item'})`}</Text>
            <LocationDetails location={vendor.location} style={{ color: textColor()}} />
        </View>
    )

    const renderText = (text, format) => (
        <Text style={[styles.text, { color: textColor() }, format]}>
            {text}
        </Text>
    )

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
            
            
            {renderText(`Ordered on ${moment(date).format('dddd, MMMM Do')} at ${moment(date).format('LT')}`)}
            
            {confirmed && renderText(`Confirmed by ${vendor.username} at ${moment(confirmed).format('LT')}`)}

            {accepted && renderText(`Accepted by ${driver.username} at ${moment(accepted).format('LT')}`)}
            
            {pickup && renderText(`Ready for pick up at ${moment(pickup).format('LT')}`, { fontWeight: received ? 500 : 600 })}

            {arrived && renderText(`Driver arrived at ${vendor.username} at ${moment(arrived).format('LT')}`)}

            {received && renderText(`Order picked up at ${moment(received).format('LT')}`)}
            
            {delivered && renderText(`Delivered at ${moment(delivered).format('LT')}`)}

            <View style={styles.columns}>
                {renderVendor()}
                {renderCustomer()}
            </View>

            {showOptionsButton()
                ? (
                    <Button
                        type='primary'
                        size='small'
                        onClick={() => onPress(_id)}
                        style={styles.button}
                    >   
                        Details &amp; Options
                    </Button>
                ) : null
            }

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
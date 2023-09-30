import React, { useContext, useState } from 'react'
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import {
    // CountdownTimer,
    // DefaultText,
    LocationDetails,
} from '.'

import { AppContext } from '../AppContext'
import main from '../styles/main'
import moment from 'moment'
import { Button } from 'antd'
import {
    DownOutlined,
    UpOutlined,
} from '@ant-design/icons'

const OrderPreview = ({ order, children, ...props }) => {

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
        ready,
        received,
        status,
        vendor,
    } = order

    const [expanded, setExpanded] = useState(false)

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

    const renderLocation = () => {
        if (user.role === 'vendor') return null
        if (user.role === 'driver' && order.status < 2) return null
        return <LocationDetails location={customer.location} style={{ color: textColor()}} />
    }

    const renderCustomer = () => customer ? (
        <View style={styles.column}>
            <Text style={[styles.heading, { color: textColor() }]}>{customer.username}</Text>
            {renderLocation()}
        </View>
    ) : <Text>No customer</Text>
    
    const renderVendor = () => vendor ? (
        <View style={styles.column}>
            <Text style={[styles.heading, { color: textColor() }]}>{`${vendor.username} (${items.length} ${items.length > 1 ? 'items' : 'item'})`}</Text>
            <LocationDetails location={vendor.location} style={{ color: textColor()}} />
        </View>
    ) : <Text>No vendor</Text>

    const renderHeaderButton = () => (
        <TouchableOpacity
            style={styles.button}
            onPress={() => setExpanded(!expanded)}
        >
            {
            expanded
            ?
            <UpOutlined />
            :
            <DownOutlined />
            }

        </TouchableOpacity>
    )

    return (
        <View
            // style={main.padded}
        >
            <View style={styles.header}>
                <View style={styles.statusDisplay}>
                    {!confirmed && vendor && <Text style={[main.text, styles.status]}>Waiting on confirmation from {vendor.username}</Text>}
                    {(confirmed && !accepted) && <Text style={[main.text, styles.status]}>Looking for available driver.</Text>}
                    {(pickup && !received) && <Text style={[main.text, styles.milestone]}>Ready for pick up at {moment(pickup).format('LT')}</Text>}
                    {(accepted && !arrived) && <Text style={[main.text, styles.status]}>{driver.username} is on the way to {vendor.username}.</Text>}
                    {ready && <Text style={[main.text, styles.status]}>Order is ready.</Text>}
                    {(arrived && !received) && <Text style={[main.text, styles.status]}>{driver.username} is onsite and waiting for your order.</Text>}
                    {(received && !delivered) && <Text style={[main.text, styles.status]}>{driver.username} is on the way.</Text>}
                </View>

                {renderHeaderButton()}
            </View>


            <View style={[styles.timeline, { display: expanded ? 'block' : 'none' }]}>
                {<Text style={[main.text, styles.milestone]}>Ordered {moment(date).format('dddd, MMM Do')} at {moment(date).format('LT')}</Text>}
                {confirmed && <Text style={[main.text, styles.milestone]}>Confirmed by {vendor.username} at {moment(confirmed).format('LT')}</Text>}
                {accepted && <Text style={[main.text, styles.milestone]}>Accepted by {driver.username} at {moment(accepted).format('LT')}</Text>}
                {arrived && <Text style={[main.text, styles.milestone]}>Driver arrived at {vendor.username} at {moment(arrived).format('LT')}</Text>}
                {ready && <Text style={[main.text, styles.milestone]}>Order marked ready at {moment(ready).format('LT')}</Text>}
                {received && <Text style={[main.text, styles.milestone]}>Order picked up at {moment(received).format('LT')}</Text>}
                {delivered && <Text style={[main.text, styles.milestone]}>{driver.username} delivered order at {moment(delivered).format('LT')}</Text>}
            </View>

            <View style={styles.columns}>
                {renderVendor()}
                {renderCustomer()}
            </View>

            {/* {showOptionsButton()
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
            } */}

            {children}

        </View>
    )
}

export default OrderPreview

const styles = StyleSheet.create({
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
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'stretch',
        alignItems: 'flex-start',
    },
    statusDisplay: {
        flex: 1,
        flexBasis: 'auto',
        flexGrow: 1,
    },
    button: {
        flexBasis: 'auto',
        flexShrink: 0,
        paddingTop: 5,
        // paddingBottom: 10,
        paddingHorizontal: 5,
    },
    status: {
        fontSize: 18,
        lineHeight: 22,
        fontWeight: 600,
    },
    timeline: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    milestone: {
        fontSize: 16,
        lineHeight: 24,
        display: 'block',
    },
})
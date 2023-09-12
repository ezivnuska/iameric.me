import React, { useContext, useState } from 'react'
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import {
    CountdownTimer,
    DefaultText,
    LocationDetails,
} from '.'

import { AppContext } from '../AppContext'
import defaultStyles from '../styles/main'
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

    const backgroundColor = () => colors[order.status]

    // useEffect(() => {
    //     console.log('order', order)
    // }, [order])

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
    
    const renderVendor = () => vendor ? (
        <View style={styles.column}>
            <Text style={[styles.heading, { color: textColor() }]}>{`${vendor.username} (${items.length} ${items.length > 1 ? 'items' : 'item'})`}</Text>
            <LocationDetails location={vendor.location} style={{ color: textColor()}} />
        </View>
    ) : null

    const renderHeaderButton = () => (
        <TouchableOpacity
            style={styles.button}
            onPress={() => setExpanded(!expanded)}
        >
            {expanded
                ? <UpOutlined /> : <DownOutlined />}
        </TouchableOpacity>
    )

    return (
        <View
            style={[
                props.style,
                getCompletedStyles(),
                {
                    borderWidth: 1,
                    borderColor: '#ccc',
                    borderRadius: 12,
                },
            ]}
        >
            <View style={styles.header}>
                <View style={styles.statusDisplay}>
                    {!confirmed && <DefaultText style={styles.status}>Waiting on confirmation from {vendor.username}</DefaultText>}
                    {(confirmed && !accepted) && <DefaultText style={styles.status}>Looking for available driver.</DefaultText>}
                    {(pickup && !received) && <DefaultText style={styles.milestone}>Ready for pick up at {moment(pickup).format('LT')}</DefaultText>}
                    {(accepted && !arrived) && <DefaultText style={styles.status}>{driver.username} is on the way to {vendor.username}.</DefaultText>}
                    {ready && <DefaultText style={styles.status}>Order is ready.</DefaultText>}
                    {(arrived && !received) && <DefaultText style={styles.status}>{driver.username} is onsite and waiting for your order.</DefaultText>}
                    {(received && !delivered) && <DefaultText style={styles.status}>{driver.username} is on the way.</DefaultText>}
                </View>

                {renderHeaderButton()}
            </View>


            <View style={[styles.timeline, { display: expanded ? 'block' : 'none' }]}>
                {<DefaultText style={styles.milestone}>Ordered {moment(date).format('dddd, MMM Do')} at {moment(date).format('LT')}</DefaultText>}
                {confirmed && <DefaultText style={styles.milestone}>Confirmed by {vendor.username} at {moment(confirmed).format('LT')}</DefaultText>}
                {accepted && <DefaultText style={styles.milestone}>Accepted by {driver.username} at {moment(accepted).format('LT')}</DefaultText>}
                {arrived && <DefaultText style={styles.milestone}>Driver arrived at {vendor.username} at {moment(arrived).format('LT')}</DefaultText>}
                {ready && <DefaultText style={styles.milestone}>Order marked ready at {moment(ready).format('LT')}</DefaultText>}
                {received && <DefaultText style={styles.milestone}>Order picked up at {moment(received).format('LT')}</DefaultText>}
                {delivered && <DefaultText style={styles.milestone}>{driver.username} delivered order at {moment(delivered).format('LT')}</DefaultText>}
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
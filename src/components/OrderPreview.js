import React, { useContext, useEffect, useState } from 'react'
import {
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native'
import {
    LocationDetails,
} from '.'

import { AppContext } from '../AppContext'
import classes from '../styles/classes'
import moment from 'moment'
import {
    DownOutlined,
    UpOutlined,
} from '@ant-design/icons'

export default ({ order, children, ...props }) => {

    const {
        user,
    } = useContext(AppContext)

    // const [item, setItem] = useState(null)

    // useEffect(() => {
        
    //     if (order) {
    //         const {
    //             _id,
    //             accepted,
    //             arrived,
    //             confirmed,
    //             customer,
    //             date,
    //             delivered,
    //             driver,
    //             items,
    //             pickup,
    //             ready,
    //             received,
    //             status,
    //             vendor,
    //         } = order

    //         setItem({
    //             _id,
    //             accepted,
    //             arrived,
    //             confirmed,
    //             customer,
    //             date,
    //             delivered,
    //             driver,
    //             items,
    //             pickup,
    //             ready,
    //             received,
    //             status,
    //             vendor,
    //         })
    //     }
    // }, [])

    // useEffect(() => {
    //     console.log('item', item)
    // }, [item])

    const [expanded, setExpanded] = useState(false)

    const textColor = () => order.status === 5 ? '#aaa' : '#000'

    const renderLocation = () => {
        if (user.role === 'vendor') return null
        if (user.role === 'driver' && order.status < 2) return null
        return <LocationDetails location={order.customer.location} style={{ color: textColor()}} />
    }

    const renderCustomer = () => order && order.customer ? (
        <View style={styles.column}>
            <Text style={classes.headerSecondary}>{order.customer.username}</Text>
            {renderLocation()}
        </View>
    ) : <Text style={classes.textDefault}>No customer</Text>
    
    const renderVendor = () => order.vendor ? (
        <View style={styles.column}>
            <Text style={classes.headerSecondary}>{`${order.vendor.username} (${order.items.length} ${order.items.length > 1 ? 'items' : 'item'})`}</Text>
            <LocationDetails location={order.vendor.location} style={{ color: textColor()}} />
        </View>
    ) : <Text style={classes.textDefault}>No vendor</Text>

    const renderHeaderButton = () => (
        <Pressable
            style={styles.button}
            onPress={() => setExpanded(!expanded)}
        >
            {
                expanded
                    ? <UpOutlined />
                    : <DownOutlined />
            }

        </Pressable>
    )

    const renderStatus = text => (
        <Text style={[classes.textDefault, styles.status]}>{text}</Text>
    )

    const renderMilestone = text => (
        <Text style={[classes.textDefault, styles.milestone]}>{text}</Text>
    )

    return order ? (
        <View>
            <View style={styles.header}>
                <View style={styles.statusDisplay}>
                    {renderStatus(`status: ${order.status}`)}
                    {!order.confirmed && order.vendor && renderStatus(`Waiting on confirmation from ${order.vendor.username}`)}
                    {(order.confirmed && !order.accepted) && renderStatus('Looking for available driver.')}
                    {(order.pickup && !order.received) && renderStatus(`Ready for pick up at ${moment(order.pickup).format('LT')}`)}
                    {(order.accepted && !order.arrived) && renderStatus(`${order.driver.username} is on the way to ${order.vendor.username}.`)}
                    {order.ready && renderStatus(`Order is ready.`)}
                    {(order.arrived && !order.received) && renderStatus(`${order.driver.username} is onsite and waiting for your order.`)}
                    {(order.received && !order.delivered) && renderStatus(`${order.driver.username} is on the way.`)}
                </View>

                {renderHeaderButton()}
            </View>

            <View>
                {/* style={[styles.timeline, { display: expanded ? 'block' : 'none' }]} */}
                {renderMilestone(`Ordered ${moment(order.date).format('dddd, MMM Do')} at ${moment(order.date).format('LT')}`)}
                {order.confirmed && renderMilestone(`Confirmed by ${order.vendor.username} at ${moment(order.confirmed).format('LT')}`)}
                {order.accepted && renderMilestone(`Accepted by ${order.driver.username} at ${moment(order.accepted).format('LT')}`)}
                {order.arrived && renderMilestone(`Driver arrived at ${order.vendor.username} at ${moment(order.arrived).format('LT')}`)}
                {order.ready && renderMilestone(`Order marked ready at ${moment(order.ready).format('LT')}`)}
                {order.received && renderMilestone(`Order picked up at ${moment(order.received).format('LT')}`)}
                {order.delivered && renderMilestone(`${order.driver.username} delivered order at ${moment(order.delivered).format('LT')}`)}
            </View>

            <View
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'stretch',
                    marginTop: 5,
                    marginBottom: 10,
                }}
            >
                {renderVendor()}
                {renderCustomer()}
            </View>

            {children}

        </View>
    ) : <Text style={classes.textDefault}>No item.</Text>
}

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
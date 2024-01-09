import React, { useContext, useEffect, useState } from 'react'
import {
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native'
import {
    // CountdownTimer,
    // DefaultText,
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

    return order ? (
        <View
            style={{
                borderWidth: 1,
                borderColor: 'red',
            }}
        >
            <View style={styles.header}>
                <View style={styles.statusDisplay}>
                    {!order.confirmed && order.vendor && <Text style={[classes.textDefault, styles.status]}>Waiting on confirmation from {order.vendor.username}</Text>}
                    {(order.confirmed && !order.accepted) && <Text style={[classes.textDefault, styles.status]}>Looking for available driver.</Text>}
                    {(order.pickup && !order.received) && <Text style={[classes.textDefault, styles.milestone]}>Ready for pick up at {moment(order.pickup).format('LT')}</Text>}
                    {(order.accepted && !order.arrived) && <Text style={[classes.textDefault, styles.status]}>{order.driver.username} is on the way to {order.vendor.username}.</Text>}
                    {order.ready && <Text style={[classes.textDefault, styles.status]}>Order is ready.</Text>}
                    {(order.arrived && !order.received) && <Text style={[classes.textDefault, styles.status]}>{order.driver.username} is onsite and waiting for your order.</Text>}
                    {(order.received && !order.delivered) && <Text style={[classes.textDefault, styles.status]}>{order.driver.username} is on the way.</Text>}
                </View>

                {renderHeaderButton()}
            </View>

            <View>
                {/* style={[styles.timeline, { display: expanded ? 'block' : 'none' }]} */}
                {<Text style={[classes.textDefault, styles.milestone]}>Ordered {moment(order.date).format('dddd, MMM Do')} at {moment(order.date).format('LT')}</Text>}
                {order.confirmed && <Text style={[classes.textDefault, styles.milestone]}>Confirmed by {order.vendor.username} at {moment(order.confirmed).format('LT')}</Text>}
                {order.accepted && <Text style={[classes.textDefault, styles.milestone]}>Accepted by {order.driver.username} at {moment(order.accepted).format('LT')}</Text>}
                {order.arrived && <Text style={[classes.textDefault, styles.milestone]}>Driver arrived at {order.vendor.username} at {moment(order.arrived).format('LT')}</Text>}
                {order.ready && <Text style={[classes.textDefault, styles.milestone]}>Order marked ready at {moment(order.ready).format('LT')}</Text>}
                {order.received && <Text style={[classes.textDefault, styles.milestone]}>Order picked up at {moment(order.received).format('LT')}</Text>}
                {order.delivered && <Text style={[classes.textDefault, styles.milestone]}>{order.driver.username} delivered order at {moment(order.delivered).format('LT')}</Text>}
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
import React, { useContext, useEffect, useState } from 'react'
import {
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native'
import {
    CartProductPreview,
    IconButton,
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

    const [expanded, setExpanded] = useState(false)
    // const [showOrderDetails, setShowOrderDetails] = useState(false)

    // useEffect(() => {
    //     console.log('order', order)
    // }, [order])

    const renderLocation = () => {
        if (user.role === 'vendor') return null
        if (user.role === 'driver' && order.status < 2) return null
        return <LocationDetails location={order.customer.location} />
    }

    const renderCustomer = () => order && order.customer
        ? (
            <View style={styles.column}>
                <Text style={classes.headerSecondary}>Drop Off</Text>
                {renderLocation()}
            </View>
        )
        : null
    
    const renderVendor = () => order && order.vendor
        ? (
            <View style={styles.column}>
                <Text style={classes.headerSecondary}>Pick Up</Text>
                <LocationDetails location={order.vendor.location} />
            </View>
        )
        : <Text style={classes.textDefault}>No vendor</Text>

    const renderHeaderButton = () => (
        <Pressable
            style={{
                flexBasis: 'auto',
                flexShrink: 0,
                paddingTop: 5,
                paddingHorizontal: 5,
            }}
            onPress={() => setExpanded(!expanded)}
        >
            {
                expanded
                    ? <UpOutlined />
                    : <DownOutlined />
            }

        </Pressable>
    )

    const showCustomerLocation = () => {
        if (user.role === 'vendor') return null
        else {
            return (
                user.role === 'customer'
                ||
                user.role === 'admin'
                ||
                (order.driver && order.driver._id === user._id && order.accepted)
            ) ? renderCustomer() : null
        }
    }

    const renderStatus = text => (
        <Text style={[classes.textDefault, styles.status]}>{text}</Text>
    )

    const renderMilestone = text => (
        <Text style={[classes.textDefault, styles.milestone]}>{text}</Text>
    )

    const renderOrderMilestones = order => (
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
    )

    const renderOrderStatus = order => (
        <View style={styles.statusDisplay}>
            {/* {user.role === 'admin' && renderStatus(`status: ${order.status}`)} */}
            {!order.confirmed && order.vendor && <Text style={classes.emergency}>Waiting on vendor confirmation</Text>}
            {(order.confirmed && !order.accepted)
                ? user.role === 'driver'
                    ? <Text style={classes.emergency}>DRIVER NEEDED</Text>
                    : <Text style={classes.emergency}>Looking for driver...</Text>
                : null
            }
            {(user.role === 'driver' && order.pickup && !order.received) && renderStatus(`Pick-up by ${moment(order.pickup).format('LT')}`)}
            {(user.role !== 'driver' && order.accepted && !order.arrived) && <Text style={classes.calm}>{order.driver.username} is headed to pickup location.</Text>}
            {order.ready && !order.received && <Text style={classes.calm}>Order is ready.</Text>}
            {(user.role !== 'driver' && order.arrived && !order.received) && <Text style={classes.calm}>{order.driver.username} is at merchant.</Text>}
            {(order.received && !order.delivered)
                ? user.role === 'customer'
                    ? <Text style={classes.calm}>Driver is on the way.</Text>
                    : user.role === 'driver'
                        ? <Text style={classes.emergency}>Proceed to delivery address.</Text>
                        : null
                : null}
            {order.delivered
                ? user.role === 'driver'
                    ? <Text style={classes.calm}>Waiting for customer confirmation.</Text>
                    : <Text style={classes.emergency}>Confirmation Requested</Text>
                : null
            }
        </View>
    )

    return (
        <View
            style={{
                opacity: order.status > 5 ? 0.5 : 1,
                // borderWidth: 1,
                // borderColor: 'red',
                marginBottom: 10,
                paddingBottom: 5,
            }}
        >
            <View>
                {renderOrderStatus(order)}

                <CartProductPreview order={order} />

                {/* {renderHeaderButton()} */}
            </View>

            {/* {(user.role === 'admin') && (
                <View style={{ borderWidth: 1, borderColor: 'yellow' }}>
                    <IconButton
                        align='right'
                        iconName={showOrderDetails ? 'chevron-up-outline' : 'chevron-down-outline'}
                        onPress={() => setShowOrderDetails(!showOrderDetails)}
                    />
                    {showOrderDetails && renderOrderMilestones(order)}
                </View>
            )} */}

            {order.status < 6 ? (
                <View
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'stretch',
                        marginTop: 10,
                        marginBottom: 5,
                        paddingVertical: 5,
                        // borderWidth: 1,
                        // borderStyle: 'dotted',
                        // borderColor: '#fff',
                    }}
                >
                    {renderVendor()}
                    {showCustomerLocation()}
                </View>
            ) : null}

            {children}
        </View>
    )
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
    statusDisplay: {
        flex: 1,
        flexBasis: 'auto',
        flexGrow: 1,
    },
    status: {
        fontSize: 18,
        lineHeight: 22,
        fontWeight: 600,
        marginBottom: 5,
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
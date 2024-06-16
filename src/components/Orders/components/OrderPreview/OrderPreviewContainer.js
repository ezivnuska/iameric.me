import React, { useEffect, useMemo } from 'react'
import { View } from 'react-native'
import { ThemedText } from '@components'
import {
    CartProductPreview,
    LocationDetails,
    OrderProcessButton,
} from './components'
import {
    useApp,
    useOrders,
} from '@context'
import { classes } from '@styles'
import moment from 'moment'

const OrderStatus = ({ status, ...props }) => (
    <ThemedText
        style={[
            {
                fontSize: 18,
                lineHeight: 24,
                fontWeight: 600,
                paddingVertical: 10,
            },
            props.style,
        ]}
    >
        {status}
    </ThemedText>
)

const CustomerStatus = ({ order }) => {
    switch (order.status) {
        case 0: return <OrderStatus status='Waiting on vendor confirmation...' />
        break
        case 1: return <OrderStatus status='Vendor confirmed. Looking for driver...' />
        break
        case 2: return <OrderStatus status='Driver headed to pick-up location...' />
        break
        case 3: return <OrderStatus status='Driver is at pick-up location.' />
        break
        case 4: return <OrderStatus status='Driver is on the way.' />
        break
        case 5: return <OrderStatus status='Order delivered!' />
        break
        case 6: return <OrderStatus status='Order recieved.' />
        break
        default: return null
    }
}

const VendorStatus = ({ order }) => {
    switch (order.status) {
        case 0: return <OrderStatus status='Awaiting confirmation.' />
        break
        case 1:
        case 2:
        case 3:
            return order.confirmed
                ? <OrderStatus status={`Order Deadline: ${moment(order.pickup).format('LT')}`} />
                : order.arrived
                    ? <OrderStatus status='Driver is on location.' />
                    : <OrderStatus status='Waiting for driver...' />
        break
        case 4: return <OrderStatus status='Driver has order.' />
        break
        default: return null
    }
}

const Details = ({ user }) => {
    const { theme } = useApp()
    return (
        <View
            style={{
                flex: 1,
                padding: 10,
                borderWidth: 1,
                borderColor: theme?.colors.border,
                borderRadius: 10,
            }}
        >
            <ThemedText style={classes.headerSecondary}>
                {user.username}
            </ThemedText>
            <LocationDetails location={user.location} />
        </View>
    )
}

const OrderDetails = ({ order }) => (
    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', gap: 10 }}>
        <Details user={order.vendor} />
        <Details user={order.customer} />
    </View>
)

const DriverStatus = ({ order }) => {
    switch (order.status) {
        case 1: return (
            <>
                <OrderStatus status={`ORDER WAITING : ${moment(order.pickup).format('LT')}`} />
                <OrderDetails order={order} />
            </>
        )
        break
        case 2: return (
            <>
                <OrderStatus status={`Drive to vendor by ${moment(order.pickup).format('LT')}`} />
                <Details user={order.vendor} />
            </>
        )
        break
        case 3: return <OrderStatus status={order.ready ? 'Order is ready now.' : `Order ready at ${moment(order.pickup).format('LT')}.`} />
        break
        case 4: return (
            <>
                <OrderStatus status='Drive to customer.' />
                <Details user={order.customer} />
            </>
        )
        break
        case 5: return <OrderStatus status='Order delivered.' />
        break
        default: return null
    }
}

export default ({ order }) => {

    const { socket, profile } = useApp()
    const { getOrder, removeOrder, updateOrder } = useOrders()

    const memo = useMemo(() => getOrder(order._id), [order])

    useEffect(() => {
        socket.on('update_order', order => {
            updateOrder(order)
        })
    }, [])

    const getUserRole = () => {
        let role = null
        if (profile) {
            if (profile.role === 'admin') role = 'admin'
            else if (profile._id === order.vendor || profile._id === order.vendor._id) role = 'vendor'
            else if (profile._id === order.customer || profile._id === order.customer._id) role = 'customer'
            else if (order.driver && (profile._id === order.driver || profile._id === order.driver._id)) role = 'driver'
        }
        return role
    }

    const renderStatus = item => {
        const role = getUserRole()
        if (!role) return 
        switch (role) {
            case 'admin':
            case 'customer':
                return <CustomerStatus order={item} />
                break
            case 'vendor': return <VendorStatus order={item} />
                break
            case 'driver': return <DriverStatus order={item} />
                break
            default: return null
        }
    }

    const renderPartyUsernames = item => {
        const size = 20
        return (
            <View
                style={{
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}
            >
                <ThemedText size={size} bold>{item.vendor?.username}</ThemedText>
                <ThemedText size={size} bold>{'-->'}</ThemedText>
                {item.driver && (
                    <>
                        <ThemedText size={size} bold>{item.driver?.username}</ThemedText>
                        <ThemedText size={size} bold>{'-->'}</ThemedText>
                    </>
                )}
                <ThemedText size={size} bold>{item.customer?.username}</ThemedText>
            </View>
        )
    }

    const authorized = () => {
        let auth = false
        if (profile) {
            if (profile.role === 'admin') auth = true
            if (
                profile._id === memo.customer._id
                ||
                profile._id === memo.vendor._id
                ||
                memo.driver && profile._id === memo.driver._id
                ||
                !memo.driver && memo.status < 2
            ) auth = true
        }
        return auth
    }

    return (
        <View>
            {renderPartyUsernames(memo)}

            {authorized() ? (
                <>

                    <View style={{ paddingHorizontal: 10 }}>
                        {renderStatus(memo)}
                    </View>

                    {memo.ready && (
                        <View style={{ margin: 10}}>
                            <ThemedText bold>Order is Ready</ThemedText>
                        </View>
                    )}

                    <View style={{ paddingVertical: 10 }}>
                        <CartProductPreview order={memo} />
                    </View>

                    <View style={{ padding: 10 }}>
                        <OrderProcessButton order={memo} />
                    </View>
                </>
            ) : (
                <View style={{ paddingHorizontal: 10 }}>
                    <CustomerStatus order={order} />
                </View>
            )}
            
        </View>
    )
}
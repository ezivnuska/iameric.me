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

    const currentOrder = useMemo(() => getOrder(order._id), [getOrder, order])

    // useEffect(() => {
    //     socket.on('updated_order', order => {
    //         console.log('updated_order', order)
    //         updateOrder(order)
    //     })
    // }, [])

    useEffect(() => {
        console.log('currentOrder', currentOrder)
    }, [currentOrder])

    const getUserRole = () => {
        let role = null
        if (profile) {
            if (profile.role === 'admin') role = 'admin'
            if (profile._id === currentOrder.vendor || profile._id === currentOrder.vendor._id) role = 'vendor'
            if (profile._id === currentOrder.customer || profile._id === currentOrder.customer._id) role = 'customer'
            else if (currentOrder.driver) {
                if (profile._id === currentOrder.driver || profile._id === currentOrder.driver._id) role = 'driver'
            } else if (profile.available) role = 'driver'
        }
        console.log('role', role)
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

    const isVendor = () => {
        return currentOrder.vendor && currentOrder.vendor._id === profile._id
    }

    const isDriver = () => {
        return (currentOrder.driver && currentOrder.driver._id === profile._id) || (!currentOrder.driver && profile.available)
    }

    const isCustomer = () => {
        return currentOrder.customer._id === profile._id
    }

    const renderProcessButton = () => {
    
        const role = getUserRole()
        let auth = false
        if (profile) {
            if (profile.role === 'admin') auth = true
            if (isCustomer()) auth = true
            if (isVendor()) auth = true
            if (isDriver() || (!currentOrder.driver && profile.isAvailable)) auth = true
        }
        console.log('authorized', auth)
        return auth ? (
            <View style={{ padding: 10 }}>
                <OrderProcessButton order={currentOrder} role={role} />
            </View>
        ) : null
    }

    return (
        <View>
            {renderPartyUsernames(currentOrder)}


            {/* <View style={{ paddingHorizontal: 10 }}>
                {renderStatus(memo)}
            </View> */}

            {currentOrder.ready && (
                <View style={{ margin: 10}}>
                    <ThemedText bold>Order is Ready</ThemedText>
                </View>
            )}

            <View style={{ paddingVertical: 10 }}>
                <CartProductPreview order={currentOrder} />
            </View>

            {renderProcessButton()}
            
        </View>
    )
}
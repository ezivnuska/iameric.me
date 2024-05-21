import React from 'react'
import { View } from 'react-native'
import { ThemedText } from '@components'
import {
    CartProductPreview,
    LocationDetails,
    OrderProcessButton,
} from './components'
import {
    useApp,
    useUser,
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
                <OrderStatus status={`DRIVER NEEDED : ${moment(order.pickup).format('LT')}`} />
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

    const { profile } = useUser()

    const showItemized = () => profile.role === 'vendor' ||
        profile.role === 'customer' ||
        profile.role === 'admin' ||
        (profile.role === 'driver' && order.status > 2 && order.status < 5)

    const renderStatus = order => {
        switch (profile.role) {
            case 'admin':
            case 'customer':
                return <CustomerStatus order={order} />
                break
            case 'vendor': return <VendorStatus order={order} />
                break
            case 'driver': return <DriverStatus order={order} />
                break
            default: return null
        }
    }

    return (
        <View>

            <View style={{ paddingHorizontal: 10 }}>
                {renderStatus(order)}
            </View>

            {showItemized() && (
                <View style={{ paddingVertical: 10 }}>
                    <CartProductPreview order={order} />
                </View>
            )}

            <View style={{ padding: 10 }}>
                <OrderProcessButton order={order} />
            </View>
        </View>
    )
}
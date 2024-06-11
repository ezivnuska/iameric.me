import React, { useEffect, useMemo } from 'react'
import {
    View,
} from 'react-native'
import {
    DriverCounter,
    OrderCounter,
} from './components'
import {
    useApp,
    useContacts,
    useModal,
    useOrders,
} from '@context'

export default () => {
    const { thin } = useApp()
    const { setModal } = useModal()
    const { orders } = useOrders()
    const { getUserCountByRole } = useContacts()
    const driverCount = useMemo(() => getUserCountByRole('driver'), [getUserCountByRole])
    const orderCount = useMemo(() => orders.length, [orders])

    // useEffect(() => {
    //     console.log('orderCount', orderCount)
    //     console.log('orders changed', orders.length)
    // }, [orderCount])

    return (
        <View
            style={{
                width: thin ? '100%' : 100,
                flexDirection: thin ? 'row' : 'column',
                justifyContent: thin ? 'space-evenly' : 'flex-start',
                // paddingHorizontal: 10,
                // backgroundColor: 'tomato',
                borderRadius: 12,
                gap: 5,
                flexWrap: 'wrap',
            }}
        >
            <OrderCounter
                count={orderCount}
                onPress={() => setModal('ORDERS')}
            />
            <DriverCounter count={driverCount} />
        </View>
    )    
}
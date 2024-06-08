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
import socket from '../../socket'

export default () => {
    const { thin } = useApp()
    const { setModal } = useModal()
    const { addOrder, removeOrder, orders } = useOrders()
    const { getUserCountByRole } = useContacts()
    const driverCount = useMemo(() => getUserCountByRole('driver'), [getUserCountByRole])

    useEffect(() =>  {
        socket.on('add_order', data => {
            console.log('adding order', data)
            addOrder(data)
        })

        socket.on('remove_order', id => {
            console.log('<< remove_order >> removing order...')
            removeOrder(id)
        })
    }, [])

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
                count={orders.length}
                onPress={() => setModal('ORDERS')}
            />
            <DriverCounter count={driverCount} />
        </View>
    )    
}
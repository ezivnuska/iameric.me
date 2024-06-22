import React, { useEffect, useMemo, useState } from 'react'
import {
    Pressable,
    View,
} from 'react-native'
import {
    // DriverCounter,
    // OrderCounter,
    DriverDisplayList,
    OrderDisplayList,
} from './components'
import {
    ThemedText,
} from '@components'
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
    const {
        getAvailableUsers,
    } = useContacts()
    // const { getUserCountByRole } = useContacts()
    const drivers = useMemo(() => getAvailableUsers(), [getAvailableUsers])
    // const driverCount = useMemo(() => getAvailableUsers().length, [getAvailableUsers])
    // const driverCount = useMemo(() => getUserCountByRole('driver'), [getUserCountByRole])
    // const orderCount = useMemo(() => orders.length, [orders])

    // useEffect(() => {
    //     console.log('orderCount', orderCount)
    //     console.log('orders changed', orders.length)
    // }, [orderCount])

    useEffect(() => {
        if (orders.length === 0 && ordersVisible) {
            setOrdersVisible(false)
        }
        if (drivers.length === 0 && driversVisible) {
            setDriversVisible(false)
        }
    }, [orders, drivers])
    const [ordersVisible, setOrdersVisible] = useState(false)
    const [driversVisible, setDriversVisible] = useState(false)
    const showDrivers = () => {
        // if (!orders || !orders.length) return false
        if (driversVisible) return true
    }
    const showOrders = () => {
        // if (!orders || !orders.length) return false
        if (ordersVisible) return true
    }

    const toggleOrderVisibility = () => setOrdersVisible(!ordersVisible)
    const toggleDriverVisibility = () => setDriversVisible(!driversVisible)

    const showOrderDetails = order => {
        setModal('ORDERS')
    }

    return (
        <View
            style={{
                flexDirection: ordersVisible || driversVisible ? 'column' : 'row',
                // flexWrap: 'wrap',
                justifyContent: ordersVisible || driversVisible ? 'flex-start' : 'space-evenly',
                width: '100%',
                gap: 10,
                marginBottom: 10,
            }}
        >
            <View
                style={{
                    flexBasis: 'auto',
                    flexGrow: 1,
                    alignItems: 'center',
                    padding: 5,
                    backgroundColor: 'tomato',
                    borderRadius: 12,
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                }}
            >
                <Pressable
                    onPress={() => toggleOrderVisibility()}
                    // onPress={() => setModal('ORDERS')}
                    disabled={orders.length < 1}
                    style={{
                        flexBasis: 'auto',
                        flexShrink: 0,
                        flexGrow: 1,
                        paddingHorizontal: 10,
                    }}
                >
                    <ThemedText size={48} bold style={{ lineHeight: 48, textAlign: 'center' }}>{`${orders.length}`}</ThemedText>
                    <ThemedText size={20} bold style={{ lineHeight: 20, textAlign: 'center' }}>{`order${orders.length !== 1 ? 's' : ''}`}</ThemedText>
                </Pressable>

                {showOrders() && (
                    <View
                        style={{
                            flexBasis: 'auto',
                            flexGrow: 1,
                            flexShrink: 1,
                            
                        }}
                    >
                        <OrderDisplayList orders={orders} onPress={showOrderDetails} />
                    </View>
                )}
            </View>
            <View
                style={{
                    flexBasis: 'auto',
                    flexGrow: 1,
                    alignItems: 'center',
                    padding: 5,
                    backgroundColor: 'tomato',
                    borderRadius: 12,
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                }}
            >
                <Pressable
                    onPress={() => toggleDriverVisibility()}
                    // onPress={() => setModal('ORDERS')}
                    disabled={drivers.length < 1}
                    style={{
                        flexBasis: 'auto',
                        flexShrink: 0,
                        flexGrow: 1,
                        paddingHorizontal: 10,
                    }}
                >
                    <ThemedText size={48} bold style={{ lineHeight: 48, textAlign: 'center' }}>{`${drivers.length}`}</ThemedText>
                    <ThemedText size={20} bold style={{ lineHeight: 20, textAlign: 'center' }}>{`driver${drivers.length !== 1 ? 's' : ''}`}</ThemedText>
                </Pressable>

                {showDrivers() && (
                    <View
                        style={{
                            flexBasis: 'auto',
                            flexGrow: 1,
                            flexShrink: 1,
                            
                        }}
                    >
                        <DriverDisplayList drivers={drivers} />
                    </View>
                )}
            </View>
        </View>
    )    
}
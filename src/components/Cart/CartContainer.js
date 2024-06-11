import React, { useMemo, useState } from 'react'
import {
    Pressable,
    Text,
    View,
} from 'react-native'
import { ThemedText } from '@components'
import {
    useApp,
    useCart,
    useModal,
    useOrders,
} from '@context'
import { submitOrder } from '@utils/orders'
import Icon from 'react-native-vector-icons/Ionicons'
import { navigationRef } from '@navigation/RootNavigation'

export default () => {

    const { socket, userId } = useApp()
    const {
        addToCart,
        clearCart,
        items,
        removeFromCart,
        removeOne,
        vendor,
    } = useCart()
    const {
        setModal,
    } = useModal()
    const {
        addOrder,
        orders,
    } = useOrders()
    
    const [detailsVisible, setDetailsVisible] = useState(false)
    const itemCount = useMemo(() => {
        if (!items || !items.length) return 0
        else {
            let count = 0
            items.map(item => count += item.quantity)
            return count
        }
    }, [items])

    const cartTotal = useMemo(() => {
        let total = 0
        if (items && items.length) {
            items.map(({ product, quantity }) => {
                total += (product.price * quantity)
            })
        }
        return String(total.toFixed(2))
    }, [items])

    const removeItem = (id, quantity) => {
        if (quantity > 1) removeOne(id)
        else removeFromCart(id)
    }

    const submitCOD = async () => {
        const newOrder = { customer: userId, items }
        const order = await submitOrder(newOrder)
        socket.emit('new_order', order)
        addOrder(order)
        clearCart()
        navigationRef.navigate('Home')
    }
    
    return itemCount > 0 && (
        <View
            style={{
                paddingHorizontal: 10,
                paddingVertical: 5,
                background: 'orange',
            }}
        >
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <Text
                    style={{
                        fontWeight: 600,
                        fontSize: 16,
                    }}
                >
                    {vendor.username}: ${cartTotal}
                </Text>

                <Pressable
                    onPress={() => setDetailsVisible(!detailsVisible)}
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                    }}
                >
                    <Text
                        style={{
                            fontWeight: 600,
                            fontSize: 16,
                            lineHeight: detailsVisible ? 20 : 24,
                        }}
                    >
                        {`${itemCount} item${itemCount === 1 ? '' : 's'} `}
                    </Text>
                        
                    <Icon
                        name={detailsVisible ? 'chevron-up-sharp' : 'reader-outline'}
                        size={detailsVisible ? 20 : 24}
                    />
                </Pressable>
            </View>

            {detailsVisible && (
                <View style={{ paddingTop: 10 }}>
                    {items.map((item, index) => {
                        const { product, quantity } = item
                        return (
                            <View
                                key={`item-${index}`}
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    paddingVertical: 5,
                                }}
                            >
                                <Text
                                    style={{ fontSize: 16 }}
                                >
                                    {quantity} {product.title}
                                </Text>

                                <View
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        gap: 5,
                                    }}
                                >
                                    
                                    <Pressable onPress={() => removeItem(product._id, quantity)}>
                                        <Icon name={`${quantity > 1 ? 'remove' : 'trash'}-outline`} size={quantity > 1 ? 24 : 20} />
                                    </Pressable>
                                    
                                    <Pressable onPress={() => addToCart(product)}>
                                        <Icon name='add-outline' size={24} />
                                    </Pressable>

                                </View>
                            </View>
                        )
                    })}

                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-evenly',
                            gap: 10,
                        }}
                    >
                        {/* <Icon
                            name='card-outline'
                            size={32}
                            onPress={() => setModal('CART')}
                        /> */}

                        <Icon
                            name='cash-outline'
                            size={32}
                            onPress={submitCOD}
                        />

                    </View>

                </View>
            )}
                    
        </View>
    )
}
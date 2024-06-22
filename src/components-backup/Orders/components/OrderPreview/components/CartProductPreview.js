import React from 'react'
import { View } from 'react-native'
import { ThemedText } from '@components'
import { useApp } from '@context'
import { getOrderTotal } from '@utils/orders'
import { classes } from '@styles'

const Quantity = ({ quantity }) => {
    
    const { theme } = useApp()

    return (
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: 20,
                height: 20,
                borderWidth: 2,
                backgroundColor: theme?.colors.quantityBackground,
                borderRadius: 10,
            }}
        >
            <ThemedText
                style={{
                    flex: 1,
                    fontSize: 14,
                    fontWeight: 500,
                    lineHeight: 20,
                    textAlign: 'center',
                    color: theme?.colors.quantityLabel,
                }}
            >
                {quantity}
            </ThemedText>
        </View>
    )
}

const CartListItem = ({ product, quantity, ...props }) => {
    
    return (
        <View
            {...props}
            style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                gap: 10,
                paddingVertical: 3,
                paddingHorizontal: 10,
            }}
        >
            <Quantity quantity={quantity} />
            
            <ThemedText
                style={{
                    flexBasis: 'auto',
                    flexGrow: 1,
                    fontSize: 14,
                    lineHeight: 20,
                    // fontWeight: 500,
                    textAlign: 'left',
                }}
            >
                {product.title}
            </ThemedText>
            
            <ThemedText
                style={[
                    classes.itemPrice,
                    {
                        fontSize: 14,
                        lineHeight: 20,
                        fontWeight: 400,
                    },
                ]}
            >
                ${Number(Number(product.price) * quantity).toFixed(2)}
            </ThemedText>
            
        </View>
    )
}

const CartTotal = ({ items, ...props }) => {

    // const getOrderTotal = items => {
    //     let total = 0
    //     items.map(item => {
    //         const { product, quantity } = item
    //         total += Number(product.price) * quantity
    //     })
    //     return total.toFixed(2)
    // }
    
    return (
        <View
            {...props}
            style={{
                marginTop: 7,
                paddingTop: 10,
                borderTopWidth: 1,
                borderTopColor: '#ccc',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-end',
                marginHorizontal: 10,
            }}
        >
            <ThemedText
                style={{
                    flex: 1,
                    fontSize: 16,
                    textAlign: 'left',
                }}
            >
                Total:
            </ThemedText>

            <ThemedText
                style={[
                    classes.orderTotal,
                    {
                        flex: 1,
                        flexShrink: 0,
                        fontSize: 16,
                        fontWeight: 500,
                    }
                ]}
            >
                ${Number(getOrderTotal(items)).toFixed(2)}
            </ThemedText>
        </View>
    )
}

export default ({ order }) => {

    const items = order.items.map((item, index) => {
        const { product, quantity } = item
        
        return product ? (
            <CartListItem product={product} quantity={quantity} key={`item-${index}`} />
        ) : null
    })

    const listItems = [
        ...items,
        <CartTotal items={order.items} key={`item-${order.items.length}`} />
    ]
    
    return (
        <View>
            {listItems}
        </View>
    )
}
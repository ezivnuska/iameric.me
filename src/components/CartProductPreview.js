import React from 'react'
import {
    View,
} from 'react-native'
import {
    ThemedText
} from '@components'
import classes from '@styles/classes'
import { useApp } from '@context'

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

const CartListItem = ({ product, quantity, ...props }) => (
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
            {Number(product.price) * quantity}
        </ThemedText>
        
    </View>
)

const CartTotal = ({ items }) => {

    const getOrderTotal = items => {
        let total = 0
        items.map(({ product, quantity }) => {
            total += Number(product.price) * quantity
        })
        return total.toFixed(2)
    }
    
    return (
        <View
            style={{
                marginTop: 3,
                paddingTop: 5,
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
                ${getOrderTotal(items)}
            </ThemedText>
        </View>
    )
}

export default ({ order }) => {
    const { items } = order

    const renderOrders = () => {
        const orders = items.map((item, index) => {
            const { product, quantity } = item
            return (
                <CartListItem product={product} quantity={quantity} key={`item-${index}`} />
            )
        })
        const listItems = [
            ...orders,
            <CartTotal items={items} key={`item-${items.length}`} />
        ]
        return listItems.map(item => item)
    }
    
    return (
        <View>
            {renderOrders()}
        </View>
    )
}
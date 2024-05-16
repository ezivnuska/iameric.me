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
                width: 30,
                height: 30,
                borderWidth: 2,
                backgroundColor: theme?.colors.quantityBackground,
                borderRadius: 15,
            }}
        >
            <ThemedText
                style={{
                    flex: 1,
                    fontSize: 18,
                    fontWeight: 500,
                    lineHeight: 30,
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
            marginBottom: 3,
            paddingHorizontal: 10,
        }}
    >
        <Quantity quantity={quantity} />
        
        <ThemedText
            style={{
                flexBasis: 'auto',
                flexGrow: 1,
                fontSize: 20,
                lineHeight: 30,
                fontWeight: 500,
                textAlign: 'left',
            }}
        >
            {product.title}
        </ThemedText>
        
        <ThemedText
            style={[
                classes.itemPrice,
                {
                    fontSize: 18,
                    lineHeight: 30,
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
                marginTop: 5,
                paddingTop: 15,
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
                    fontSize: 22,
                    fontWeight: 400,
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
                        fontSize: 22,
                        fontWeight: 500,
                        paddingLeft: 5,
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
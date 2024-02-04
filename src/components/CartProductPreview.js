import React from 'react'
import {
    FlatList,
    Image,
    Text,
    View,
} from 'react-native'
import classes from '../styles/classes'
import DefaultText from './DefaultText'

const IMAGE_SIZE = 24
const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'

const ProductThumb = ({ product }) => (
    <Image
        width={IMAGE_SIZE}
        height={IMAGE_SIZE}
        source={{ uri: `${IMAGE_PATH}/${product.vendor.username}/thumb/${product.image.filename}` }}
        style={{
            resizeMode: 'cover',
            width: IMAGE_SIZE,
            height: IMAGE_SIZE,
            borderWidth: 1,
            borderColor: '#999',
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
        }}
    />
)

const Quantity = ({ quantity }) => (
    <View
        style={{
            width: 20,
            height: 20,
            borderWidth: 1,
            borderColor: '#fff',
            borderRadius: 5,
        }}
    >
        <Text
            style={{
                width: 20,
                lineHeight: 20,
                textAlign: 'center',
                color: '#fff',
                fontWeight: 500,
            }}
        >
            {quantity}
        </Text>
    </View>
)

const CartListItem = ({ item, quantity, ...props }) => {
    return (
        <View
            {...props}
            style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingVertical: 3,
                marginBottom: 3,
            }}
        >
            <View
                style={{
                    flexBasis: 'auto',
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                }}
            >
                <View
                    style={{
                        flexBasis: 'auto',
                        flexGrow: 0,
                        flexShrink: 0,
                        paddingRight: 10,
                    }}
                >
                    <Quantity quantity={quantity} />
                    {/* <ProductThumb product={item} /> */}
                </View>
                    
                <DefaultText
                    style={{ flexBasis: 'auto', flexGrow: 1 }}
                >
                    {item.title}
                </DefaultText>
                
                <DefaultText
                    style={classes.itemPrice}
                >
                    {Number(item.price) * Number(quantity)}
                </DefaultText>
                
            </View>
        </View>
    )
}

const getOrderTotal = items => {
    let total = 0
    items.map(({ product, quantity }) => {
        total += Number(product.price) * quantity
    })
    return total.toFixed(2)
}

const CartTotal = ({ order }) => (
    <View
        style={{
            marginTop: 5,
            paddingTop: 5,
            borderTopWidth: 1,
            borderTopColor: '#ccc',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
        }}
    >
        <DefaultText bold>
            Total:
        </DefaultText>

        <DefaultText
            style={classes.orderTotal}
        >
            ${getOrderTotal(order)}
        </DefaultText>
    </View>
)

export default ({ order }) => {
    
    const listItems = order.items.map(({ product, quantity }, index) => (
        <CartListItem item={product} quantity={quantity} key={`item-${index}`} />
    ))

    return (
        <FlatList
            data={[...listItems, <CartTotal order={order.items} key={`item-${order.items.length}`} />]}
            listKey={() => 'order-items'}
            keyExtractor={(item, index) => 'order-item-key' + index}
            renderItem={({ item, index }) => item}
        />
    )
}
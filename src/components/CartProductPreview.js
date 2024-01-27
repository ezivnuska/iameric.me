import React from 'react'
import {
    FlatList,
    Image,
    Text,
    View,
} from 'react-native'
import classes from '../styles/classes'

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

const CartListItem = ({ item }) => (
    <View
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
                <ProductThumb product={item} />
            </View>
                
            <Text
                style={[
                    { flexBasis: 'auto', flexGrow: 1 },
                    classes.textDefault,
                ]}
            >
                {item.title}
            </Text>
            
            <Text
                style={[
                    classes.textDefault,
                    classes.itemPrice,
                ]}
            >
                {item.price}
            </Text>
            
        </View>
    </View>
)

const CartTotal = ({ order }) => {
    const getOrderTotal = ({ items }) => {
        let total = 0
        items.map(({ price }) => {
            total += Number(price)
        })
        return total.toFixed(2)
    }
    return (
        <View
            style={{
                marginTop: 5,
                paddingTop: 5,
                borderTopWidth: 1,
                // borderTopStyle: 'dotted',
                borderTopColor: '#ccc',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
            }}
        >
            <Text
                style={[
                    classes.textDefault,
                    classes.bold,
                ]}
            >
                Total:
            </Text>
            <Text
                style={[
                    classes.textDefault,
                    classes.orderTotal,
                ]}
            >
                {`$${getOrderTotal(order)}`}
            </Text>
        </View>
    )
}

export default ({ order }) => {
    
    const listItems = () => [
        ...order.items.map((item, index) => <CartListItem item={item} key={`item-${index}`} />),
        <CartTotal order={order} key={`item-${order.items.length}`} />,
    ]

    return order.items ? (
        <View
            // style={{ borderWidth: 1, borderColor: 'green' }}
        >
            
            <FlatList
                data={listItems()}
                listKey={() => 'order-items'}
                keyExtractor={(item, index) => 'order-item-key' + index}
                renderItem={({ item, index }) => item}
            />

        </View>
    ) : null
}
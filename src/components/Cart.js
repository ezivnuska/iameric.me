import React, { useContext, useState } from 'react'
import {
    FlatList,
    Text,
    View,
} from 'react-native'
import {
    CartProductPreview,
    IconButton,
} from '.'
import { AppContext } from '../AppContext'
import classes from '../styles/classes'
import axios from 'axios'

export default ({ onSubmitted }) => {

    const {
        dispatch,
        user,
        cart,
    } = useContext(AppContext)

    const [loading, setLoading] = useState(false)

    const getTotal = () => {
        let total = 0
        cart[0].items.map(i => total += Number(i.price))
        return String(total.toFixed(2))
    }

    const getVendor = () => {
        let id = null
        cart[0].items.map(item => id = item.vendor ? item.vendor._id : null)
        return id
    }

    const submitOrder = async () => {
        const newOrder = {
            customer: user._id,
            vendor: getVendor(),
            items: cart[0].items.map(item => item._id),
        }
        
        setLoading('Submitting order...', newOrder)

        const { data } = await axios.
            post('/api/order', newOrder)

        setLoading(null)
        
        if (!data) {
            console.log('Order submission failed')
            return
        }

        onSubmitted(data)
    }

    return cart ? (
        <View>
            <FlatList
                style={{
                    paddingBottom: 10,
                }}
                data={cart}
                keyExtractor={(item, index) => index}
                renderItem={({ item }) => (
                    <CartProductPreview order={item} />
                )} 
            />
            <View
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingBottom: 10,
                }}
            >
                <Text
                    style={[
                        classes.textDefault,
                        {
                            flexBasis: '80%',
                            flexGrow: 1,
                            flexShrink: 0,
                        },
                        {
                            fontWeight: 700,
                        },
                    ]}
                >
                    Total:
                </Text>
                <Text
                    style={[
                        classes.textDefault,
                        {
                            flexBasis: 'auto',
                            flexGrow: 0,
                            flexShrink: 1,
                        },
                        {
                            fontWeight: 700,
                        },
                    ]}
                >
                    ${getTotal()}
                </Text>
            </View>
            
            <IconButton
                label='Submit Order'
                onPress={submitOrder}
                bgColor='blue'
                disabled={loading}
            />
            
            <IconButton
                label='Clear Cart'
                onPress={() => dispatch({ type: 'CLEAR_CART' })}
                bgColor='gray'
                disabled={loading}
            />

        </View>
    ) : null
}
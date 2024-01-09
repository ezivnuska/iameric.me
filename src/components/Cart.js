import React, { useContext, useEffect, useState } from 'react'
import {
    FlatList,
    StyleSheet,
    Text,
    View,
} from 'react-native'
import { AppContext } from '../AppContext'
import classes from '../styles/classes'
import axios from 'axios'
import { Button } from 'antd'

export default ({ onSubmitOrder }) => {

    const {
        dispatch,
        user,
        cart,
    } = useContext(AppContext)

    const [loading, setLoading] = useState(false)

    const getTotal = () => {
        let total = 0
        cart.map(i => total += Number(i.price))
        return String(total.toFixed(2))
    }

    const getVendor = () => {
        let id = null
        cart.map(item => id = item.vendor ? item.vendor._id : null)
        return id
    }

    const submitOrder = async () => {
        const newOrder = {
            customer: user._id,
            vendor: getVendor(),
            items: cart.map(item => item._id),
        }
        
        setLoading('Submitting order...')

        const { data } = await axios.
            post('/api/order', newOrder)

        setLoading(null)
        
        if (!data) {
            console.log('Order submission failed')
            return
        }
        
        dispatch({ type: 'ADD_ORDER', order: data })

        onSubmitOrder()
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
                    <View style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}>
                        <Text
                            style={classes.textDefault}
                        >
                            {item.title}
                        </Text>

                        <Text
                            style={[
                                classes.textDefault,
                                {
                                    flexBasis: 'auto',
                                    flexGrow: 0,
                                    flexShrink: 1,
                                },
                            ]}
                        >
                            ${item.price}
                        </Text>
                    </View>
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

            <Button
                type='primary'
                onClick={submitOrder}
                disabled={loading}
                style={{ marginBottom: 10 }}
            >
                Submit Order
            </Button>

            <Button
                type='default'
                onClick={() => dispatch({ type: 'CLEAR_CART' })}
                disabled={loading}
                style={{ marginBottom: 10 }}
            >
                Clear Cart
            </Button>

        </View>
    ) : null
}
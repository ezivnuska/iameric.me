import React, { useContext, useEffect, useState } from 'react'
import {
    ActivityIndicator,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import {
    ButtonPrimary,
    // ItemizedListItem,
    OrderPreview,
} from '.'
import axios from 'axios'
import { AppContext } from '../AppContext'
import defaultStyles from '../styles'

const ItemizedList = ({ order }) => {
    
    const {
        dispatch,
        user,
    } = useContext(AppContext)

    const { customer, vendor, _id } = order

    const [loading, setLoading] = useState(false)
    const [items, setItems] = useState(order.items)

    // useEffect(() => {
    // }, [])

    const removeItem = id => {
        setItems(items.filter(item => item != id))
    }

    const removeOrder = id => {
        dispatch({ type: 'REMOVE_ORDER', id })
    }

    const deleteOrder = async id => {
        setLoading(true)
        const { data: { order } } = await axios.delete(`/api/order/${id}`)
        removeItem(id)
        removeOrder(id)
        setLoading(false)
    }

    const getOrderTotal = () => {
        let total = 0
        items.map(item => total += Number(item.price))
        return total.toFixed(2)
    }

    const colors = ['red', 'blue', 'purple', 'orange', 'green']

    const getOrderStatus = () => {
        let status = null
        switch(order.status) {
            case 0: status = 'Pending'; break
            case 1: status = 'Confirmed'; break
            case 2: status = 'Accepted'; break
            case 3: status = 'Picked Up'; break
            case 4: status = 'Delivered'; break
        }
        return <Text style={[styles.status, { backgroundColor: colors[order.status]}]}>{status}</Text>
    }

    const confirmOrder = async () => {
        const confirmedOrder = await axios.
            post(`/api/order/confirm/${order._id}`)
        
        if (!confirmedOrder) console.log('Error confirming order')

        dispatch({ type: 'CONFIRM_ORDER', id: confirmedOrder._id })
    }

    const renderButton = () => {
        const { role } = user
        const { status } = order
        let button
        switch (role) {
            case 'customer':
                
            break
            case 'vendor':
                button = (status === 0) ? (
                    <ButtonPrimary
                        label='Confirm Order'
                        onPress={() => confirmOrder()}
                    />
                ) : null
            break
            case 'driver':
                button = (status === 1) ? (
                    <ButtonPrimary
                        label='Accept Order'
                        onPress={() => confirmOrder()}
                    />
                ) : null
            break
        }
        return button
    }

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => deleteOrder(_id)}
            disabled={loading}
        >
            <Text style={styles.label}>{`${vendor.username} --> ${customer.username}`}</Text>
            {getOrderStatus()}
            <View style={styles.listContainer}>
                <FlatList
                    style={styles.list}
                    data={items}
                    listKey={() => 'products'}
                    keyExtractor={(item, index) => 'product' + index}
                    renderItem={({ item }) => (
                        <OrderPreview
                            order={item}
                        />
                    )} 
                />
                <View style={styles.totalContainer}>
                    <Text style={[defaultStyles.text, styles.label]}>Total:</Text>
                    <Text style={[defaultStyles.text, styles.total]}>${getOrderTotal()}</Text>
                </View>
                {renderButton()}
            </View>
        </TouchableOpacity>
    )   
}

export default ItemizedList

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 5,
        paddingVertical: 5,
        borderWidth: 1,
        borderStyle: 'dotted',
    },
    listContainer: {
        // marginVertical: 5,
        borderWidth: 1,
        borderStyle: 'dotted',
        borderColor: 'red',
    },
    list: {

    },
    vendorName: {
        fontSize: 18,
        lineHeight: 24,
        fontWeight: 600,
    },
    totalContainer: {
        display: 'flex',
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        // marginTop: 7,
        paddingVertical: 2,
        // paddingBottom: 5,
    },
    status: {
        fontWeight: 600,
        color: '#fff',
        borderRadius: 6,
        marginVertical: 5,
        paddingHorizontal: 5,
        paddingVertical: 5,
    },
    label: {
        // flex: 1,
        // flexBasis: '70%',
        // flexShrink: 0,
        // flexGrow: 1,
        // fontSize: 18,
        // fontWeight: 500,
    },
    total: {
        flex: 1,
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: '30%',
        textAlign: 'right',
        fontSize: 18,
        fontWeight: 500,
        color: '#666',
    },
})
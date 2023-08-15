import React, { useContext, useEffect } from 'react'
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import { AppContext } from '../AppContext'

const colors = [
    'pink',
    'lightblue',
    'green',
    'orange',
    'purple',
]

const OrderPreview = ({ order, onPress }) => {

    const {
        user,
    } = useContext(AppContext)

    const {
        _id,
        customer,
        driver,
        items,
        vendor,
        status,
    } = order

    // useEffect(() => {
    // }, [driver])

    const modalDisabled = () => {
        if (user.role == 'customer' && status < 4) return false
        if (user.role == 'vendor' && (status == 0 || status == 4)) return false
        if (user.role == 'driver' && (status > 0)) return false
        return true
    }

    const renderStatus = () => {
        switch (status) {
            case 0:
                return <Text>Submitted</Text>
            break
            case 1:
                return <Text>Confirmed</Text>
            break
            case 2:
                return <Text>Accepted</Text>
            break
            case 3:
                return <Text>Picked Up</Text>
            break
            case 4:
                return <Text>Delivered</Text>
            break
        }
    }

    return (
        <TouchableOpacity
            onPress={() => onPress(_id)}
            disabled={modalDisabled()}
            style={[styles.container, { backgroundColor: colors[status] }]}
        >
            {vendor && <Text>{vendor.username} ({items.length})</Text>}
            <Text>{renderStatus()}</Text>
            {customer && <Text>{customer.username}</Text>}
        </TouchableOpacity>
    )
}

export default OrderPreview

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexGrow: 1,
        flexShrink: 0,
        flexBasis: 'auto',
        maxWidth: '30%',
        marginBottom: 10,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 4,
    },
})
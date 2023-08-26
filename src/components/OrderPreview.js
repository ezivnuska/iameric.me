import React, { useContext, useEffect } from 'react'
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import { AppContext } from '../AppContext'

const OrderPreview = ({ order, onPress, ...props }) => {

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

    const colors = [
        'pink',
        'lightblue',
        'green',
        'orange',
        '#eee',
    ]

    const statusLabels = [
        'Submitted',
        'Confirmed',
        'Accepted',
        'Picked Up',
        'Delivered',
    ]

    const textColor = () => order.status >= 4 ? '#aaa' : '#000'

    const backgroundColor = () => colors[order.status]

    const getCompletedStyles = () => order.status >= 4 ? {
        borderWidth: 2,
        borderStyle: 'dashed',
        borderColor: '#aaa',
    } : null

    const modalDisabled = () => {
        if (user.role == 'customer' && status < 4) return false
        if (user.role == 'vendor' && (status == 0 || status == 4)) return false
        if (user.role == 'driver' && (status > 0)) return false
        return true
    }

    return (
        <TouchableOpacity
            onPress={() => onPress(_id)}
            disabled={modalDisabled()}
            style={[
                props.style,
                getCompletedStyles(),
                {
                    backgroundColor: backgroundColor(),
                },
            ]}
        >
            {vendor && <Text style={{ color: textColor()}}>{vendor.username} ({items.length})</Text>}
            <Text style={{ color: textColor()}}>{statusLabels[status]}</Text>
            {customer && <Text style={{ color: textColor()}}>{customer.username}</Text>}
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
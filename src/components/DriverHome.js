import React from 'react'
import {
    View,
} from 'react-native'
import {
    DriverSelector,
    OrderListContainer,
} from '.'

export default () => {

    return (
        <View style={{ borderWidth: 1 }}>
            
            <OrderListContainer />

            <DriverSelector />

        </View>
    )
}
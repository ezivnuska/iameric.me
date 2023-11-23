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
        <View>
            
            <OrderListContainer />

            <DriverSelector />

        </View>
    )
}
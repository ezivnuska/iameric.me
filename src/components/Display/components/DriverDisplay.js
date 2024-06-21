import React from 'react'
import {
    View,
} from 'react-native'
import {
    ThemedText,
} from '@components'

export default ({ driver, ...props }) => {
    return (
        <View
            {...props}
            style={{
                backgroundColor: 'tomato',
                borderRadius: '12',
                paddingVertical: 5,
                paddingHorizontal: 10,
            }}
        >
            <ThemedText>{driver.username}</ThemedText>
            {driver.available && <ThemedText>Available</ThemedText>}
            <ThemedText>Deposit: ${Number(driver.deposit).toFixed(2)}</ThemedText>
            <ThemedText>Wages: ${Number(driver.wages).toFixed(2)}</ThemedText>
        </View>
    )
}
import React from 'react'
import {
    View,
} from 'react-native'
import {
    DriverDisplay,
} from '.'

export default ({ drivers, ...props }) => (
    <View
        {...props}
        style={{
            gap: 10,
        }}
    >

        {drivers.map((driver, index) => (
            <DriverDisplay driver={driver} key={`driver-display-${index}`} />
        ))}
        
    </View>
)
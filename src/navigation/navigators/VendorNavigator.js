import React from 'react'
import {
    VendorsScreen,
    VendorScreen,
} from '../../screens'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const VendorStack = createNativeStackNavigator()

export default () => (
    <VendorStack.Navigator
        initialRouteName='VendorList'
        screenOptions={{
            headerShown: false,
        }}
    >
        <VendorStack.Screen
            name='VendorList'
            component={VendorsScreen}
            options={{ title: 'Vendors' }}
        />

        <VendorStack.Screen
            name='Vendor'
            component={VendorScreen}
            options={{
                title: 'Vendor',
                unmountOnBlur: true,
            }}
        />
        
    </VendorStack.Navigator>
)
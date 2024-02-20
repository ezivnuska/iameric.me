import React from 'react'
import {
    ProductsScreen,
} from '../screens'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const ProductStack = createNativeStackNavigator()

export default () => (
    <ProductStack.Navigator
        initialRouteName='ProductList'
        screenOptions={{
            headerShown: false,
        }}
    >
        <ProductStack.Screen
            name='ProductList'
            component={ProductsScreen}
            options={{ title: 'Products' }}
        />
        
    </ProductStack.Navigator>
)
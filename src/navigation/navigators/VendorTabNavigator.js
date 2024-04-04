import React from 'react'
import {
    ForumScreen,
    OrderScreen,
} from '../../screens'
import {
    ProductNavigator,
    UserNavigator,
} from '.'
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation'
import Icon from 'react-native-vector-icons/Ionicons'
import { useApp } from '@context'


const VendorTabStack = createMaterialBottomTabNavigator()

export default () => {

    const { theme } = useApp()

    const iconSize = 24
    
    return (
        <>
            <VendorTabStack.Screen
                name='Orders'
                component={OrderScreen}
                options={{
                    tabBarLabel: 'Orders',
                    tabBarIcon: ({ focused, color }) => (
                        <Icon name='alert-circle-outline' size={iconSize} color={color} />
                    ),
                }}
            />

            <VendorTabStack.Screen
                name='Products'
                component={ProductNavigator}
                options={({ navigation }) => ({
                    tabBarLabel: 'Products',
                    tabBarIcon: ({ focused, color }) => (
                        <Icon name='grid-outline' size={iconSize} color={color} />
                    ),
                })}
            />

            <VendorTabStack.Screen
                name='Users'
                component={UserNavigator}
                options={({ route, navigation }) => ({
                    tabBarLabel: 'Users',
                    tabBarIcon: ({ focused, color }) => (
                        <Icon name='people-circle-outline' size={iconSize} color={color} />
                    ),
                })}
            />

            <VendorTabStack.Screen
                name='Forum'
                component={ForumScreen}
                options={{
                    tabBarLabel: 'Forum',
                    tabBarIcon: ({ focused, color }) => (
                        <Icon name='chatbubble-outline' size={iconSize} color={color} />
                    ),
                }}
            />

            {/* <VendorTabStack.Screen
                name='Images'
                component={ImagesScreen}
                options={{
                    tabBarLabel: 'Images',
                    tabBarIcon: ({ focused, color }) => (
                        <Icon name='images-outline' size={iconSize} color={color} />
                    ),
                }}
            /> */}
            
            {/* <VendorTabStack.Screen
                name='Settings'
                component={SettingsScreen}
                options={{
                    tabBarLabel: 'Settings',
                    tabBarIcon: ({ focused, color }) => (
                        <Icon name='cog' size={iconSize} color={color} />
                    ),
                }}
            /> */}

        </>
    )
}
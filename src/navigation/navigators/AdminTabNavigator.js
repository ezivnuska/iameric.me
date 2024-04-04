import React from 'react'
import {
    ForumScreen,
    OrderScreen,
} from '../../screens'
import {
    UserNavigator,
    VendorNavigator,
} from '.'
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation'
import Icon from 'react-native-vector-icons/Ionicons'

const AdminTabStack = createMaterialBottomTabNavigator()

export default () => {

    const iconSize = 24

    return (
        <>
            <AdminTabStack.Screen
                name='Orders'
                component={OrderScreen}
                options={{
                    tabBarLabel: 'Orders',
                    unmountOnBlur: true,
                    tabBarIcon: ({ focused, color }) => (
                        <Icon name='alert-circle-outline' size={iconSize} color={color} />
                    ),
                }}
            />

            <AdminTabStack.Screen
                name='Vendors'
                component={VendorNavigator}
                options={({ route, navigation }) => ({
                    tabBarLabel: 'Merchants',
                    unmountOnBlur: true,
                    tabBarIcon: ({ focused, color }) => (
                        <Icon name='fast-food-outline' size={iconSize} color={color} />
                    ),
                })}
            />

            <AdminTabStack.Screen
                name='Users'
                component={UserNavigator}
                options={({ route, navigation }) => ({
                    tabBarLabel: 'Users',
                    unmountOnBlur: true,
                    tabBarIcon: ({ focused, color }) => (
                        <Icon name='people-circle-outline' size={iconSize} color={color} />
                    ),
                })}
            />

            <AdminTabStack.Screen
                name='Forum'
                component={ForumScreen}
                options={{
                    tabBarLabel: 'Forum',
                    unmountOnBlur: true,
                    tabBarIcon: ({ focused, color }) => (
                        <Icon name='chatbubble-outline' size={iconSize} color={color} />
                    ),
                }}
            />

            {/* <AdminTabStack.Screen
                name='Images'
                component={ImagesScreen}
                options={{
                    tabBarLabel: 'Images',
                    unmountOnBlur: true,
                    tabBarIcon: ({ focused, color }) => (
                        <Icon name='images-outline' size={iconSize} color={color} />
                    ),
                }}
            /> */}
            
            {/* <AdminTabStack.Screen
                name='Settings'
                component={SettingsScreen}
                options={{
                    tabBarLabel: 'Settings',
                    unmountOnBlur: true,
                    tabBarIcon: ({ focused, color }) => (
                        <Icon name='cog' size={iconSize} color={color} />
                    ),
                }}
            /> */}

        </>
    )
}
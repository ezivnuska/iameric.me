import React from 'react'
import {
    ForumScreen,
    ImagesScreen,
    OrderScreen,
    SettingsScreen,
} from '../screens'
import {
    UserNavigator,
    VendorNavigator,
} from '.'
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation'
import Icon from 'react-native-vector-icons/Ionicons'
import { useTheme } from 'react-native-paper'

const CustomerTabStack = createMaterialBottomTabNavigator()

export default () => {

    const theme = useTheme()

    const iconSize = 24
    
    return (
        <CustomerTabStack.Navigator
            initialRouteName={'Vendors'}
            activeColor={theme?.colors.tabActive}
            inactiveColor={theme?.colors.tabInactive}
            barStyle={{
                backgroundColor: 'transparent',
                width: '100%',
                minWidth: 300,
                maxWidth: 900,
                marginHorizontal: 'auto',
                elevation: 0,
            }}
            screenOptions={{
                headerShown: false,
            }}
        >
            <CustomerTabStack.Screen
                name='Orders'
                component={OrderScreen}
                options={{
                    tabBarLabel: 'Orders',
                    tabBarIcon: ({ focused, color }) => (
                        <Icon name='alert-circle-outline' size={iconSize} color={color} />
                    ),
                }}
            />

            <CustomerTabStack.Screen
                name='Vendors'
                component={VendorNavigator}
                options={({ route, navigation }) => ({
                    tabBarLabel: 'Merchants',
                    tabBarIcon: ({ focused, color }) => (
                        <Icon name='fast-food-outline' size={iconSize} color={color} />
                    ),
                })}
            />

            <CustomerTabStack.Screen
                name='Users'
                component={UserNavigator}
                options={({ route, navigation }) => ({
                    tabBarLabel: 'Users',
                    tabBarIcon: ({ focused, color }) => (
                        <Icon name='people-circle-outline' size={iconSize} color={color} />
                    ),
                })}
            />

            <CustomerTabStack.Screen
                name='Forum'
                component={ForumScreen}
                options={{
                    tabBarLabel: 'Forum',
                    tabBarIcon: ({ focused, color }) => (
                        <Icon name='chatbubble-outline' size={iconSize} color={color} />
                    ),
                }}
            />

            <CustomerTabStack.Screen
                name='Images'
                component={ImagesScreen}
                options={{
                    tabBarLabel: 'Images',
                    tabBarIcon: ({ focused, color }) => (
                        <Icon name='images-outline' size={iconSize} color={color} />
                    ),
                }}
            />
            
            <CustomerTabStack.Screen
                name='Settings'
                component={SettingsScreen}
                options={{
                    tabBarLabel: 'Settings',
                    tabBarIcon: ({ focused, color }) => (
                        <Icon name='cog' size={iconSize} color={color} />
                    ),
                }}
            />

        </CustomerTabStack.Navigator>
    )
}
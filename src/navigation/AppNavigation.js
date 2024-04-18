import React from 'react'
import {
    NavigationContainer,
} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation'
import {
    ContactListScreen,
    FallbackScreen,
    ForumScreen,
    ImagesScreen,
    OrderScreen,
    ProductsScreen,
    SettingsScreen,
    StartScreen,
    VendorScreen,
    VendorsScreen,
} from '../screens'
import Icon from 'react-native-vector-icons/Ionicons'
import { navigationRef } from './RootNavigation'
import { useApp, useAuth } from '@context'

const iconSize = 24

const VendorStack = createNativeStackNavigator()
const VendorStackScreen = () => (
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

const ProductStack = createNativeStackNavigator()

const ProductStackScreen = () => (
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

const TabStack = createMaterialBottomTabNavigator()
const TabStackScreen = () => {
    
    const { theme } = useApp()

    return (
        <TabStack.Navigator
            initialRouteName={'Vendors'}
            activeColor={theme?.colors.tabActive}
            inactiveColor={theme?.colors.tabInactive}
            barStyle={{
                backgroundColor: 'transparent',
                width: '100%',
                minWidth: 280,
                maxWidth: 900,
                marginHorizontal: 'auto',
                elevation: 0,
            }}
            screenOptions={{
                headerShown: false,
            }}
        >
            <TabStack.Screen
                name='Orders'
                component={OrderScreen}
                options={{
                    tabBarLabel: 'Orders',
                    tabBarIcon: ({ focused, color }) => (
                        <Icon name='alert-circle-outline' size={iconSize} color={color} />
                    ),
                }}
            />

            <TabStack.Screen
                name='Users'
                component={ContactListScreen}
                options={({ route, navigation }) => ({
                    tabBarLabel: 'Users',
                    tabBarIcon: ({ focused, color }) => (
                        <Icon name='people-circle-outline' size={iconSize} color={color} />
                    ),
                    unmountOnBlur: true,
                })}
            />

            <TabStack.Screen
                name='Forum'
                component={ForumScreen}
                options={{
                    tabBarLabel: 'Forum',
                    tabBarIcon: ({ focused, color }) => (
                        <Icon name='chatbubble-outline' size={iconSize} color={color} />
                    ),
                }}
            />

            <TabStack.Screen
                name='Vendors'
                component={VendorStackScreen}
                options={{
                    tabBarLabel: 'Vendors',
                    tabBarIcon: ({ focused, color }) => (
                        <Icon name='fast-food-outline' size={iconSize} color={color} />
                    ),
                }}
            />

        </TabStack.Navigator>
    )
}

const SettingsStack = createMaterialBottomTabNavigator()
const SettingsStackScreen = () => {
    const { theme } = useApp()
    return (
        <SettingsStack.Navigator
            initialRouteName='Profile'
            activeColor={theme?.colors.tabActive}
            inactiveColor={theme?.colors.tabInactive}
            barStyle={{
                backgroundColor: 'transparent',
                width: '100%',
                minWidth: 280,
                maxWidth: 900,
                marginHorizontal: 'auto',
                elevation: 0,
            }}
            screenOptions={{
                headerShown: false,
            }}
        >
            <SettingsStack.Screen
                name='Profile'
                component={SettingsScreen}
                options={{
                    tabBarLabel: 'Settings',
                    tabBarIcon: ({ focused, color }) => (
                        <Icon name='cog' size={iconSize} color={color} />
                    ),
                }}
            />

            <SettingsStack.Screen
                name='Images'
                component={ImagesScreen}
                options={{
                    tabBarLabel: 'Images',
                    tabBarIcon: ({ focused, color }) => (
                        <Icon name='images-outline' size={iconSize} color={color} />
                    ),
                }}
            />

            <SettingsStack.Screen
                name='Products'
                component={ProductStackScreen}
                options={{
                    tabBarLabel: 'Products',
                    tabBarIcon: ({ focused, color }) => (
                        <Icon name='grid-outline' size={iconSize} color={color} />
                    ),
                }}
            />

        </SettingsStack.Navigator>
    )
}

const AppStack = createNativeStackNavigator()
const AppStackScreen = () => {
    const { status } = useAuth()
    return (
        <AppStack.Navigator
            initialRouteName='Start'
            screenOptions={{
                headerShown: false,
            }}
        >

            <AppStack.Screen
                name='Start'
                component={StartScreen}
                options={{ title: 'Start' }}
            />

            {status === 'in' && (
                <>
                    <AppStack.Screen
                        name='Tabs'
                        component={TabStackScreen}
                    />

                    <AppStack.Screen
                        name='Settings'
                        component={SettingsStackScreen}
                    />
                </>
            )}

            <AppStack.Screen
                name='Fallback'
                component={FallbackScreen}
                options={{ title: 'Page not found' }}
            />
        </AppStack.Navigator>
    )
}

const linking = {
    prefixes: ['https://iameric.me'],
    config: {
        screens: {
            Start: 'start',
            Tabs: {
                path: '',
                screens: {
                    Orders: {
                        path: 'orders',
                        screens: {
                            OrderList: '',
                        },
                    },
                    Users: 'users',
                    Vendors: {
                        path: 'vendors',
                        screens: {
                            VendorList: '',
                            Vendor: '/:id',
                        },
                    },
                    Forum: 'forum',
                },
            },
            Settings: {
                path: 'settings',
                screens: {
                    Profile: '',
                    Images: 'images',
                    Products: {
                        path: 'products',
                        screens: {
                            ProductList: '',
                        },
                    },
                }
            },
            Fallback: 'oops',
        },
    },
}

export default () => {
    
    const { theme } = useApp()
    
    return (
        <NavigationContainer
            ref={navigationRef}
            linking={linking}
            fallback={<FallbackScreen />}
            theme={theme}
        >
            <AppStackScreen />
        </NavigationContainer>
    )
}
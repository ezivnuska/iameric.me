import React, { useContext, useEffect } from 'react'
import {
    NavigationContainer,
} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import {
    DetailsScreen,
    DriverScreen,
    DriversScreen,
    FallbackScreen,
    ForumScreen,
    ImagesScreen,
    OrderScreen,
    ProductsScreen,
    SettingsScreen,
    StartScreen,
    UsersScreen,
    VendorScreen,
    VendorsScreen,
} from '../screens'
import { navigationRef } from './RootNavigation'
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import Icon from 'react-native-vector-icons/Ionicons'
import { AppContext } from '../AppContext'
import { useTheme } from 'react-native-paper'

const UsersStack = createNativeStackNavigator()
const UsersStackScreen = () => {

    return (
        <UsersStack.Navigator
            screenOptions={() => ({
                initialRouteName: 'UserList',
                headerShown: false,
            })}
        >
            <UsersStack.Screen
                name='UserList'
                component={UsersScreen}
                options={{ title: 'UserList' }}
            />

            <UsersStack.Screen
                name='User'
                component={DetailsScreen}
                options={{ title: 'User' }}
            />
            
        </UsersStack.Navigator>
    )
}

const VendorsStack = createNativeStackNavigator()
const VendorsStackScreen = () => (
    <VendorsStack.Navigator
        screenOptions={() => ({
            initialRouteName: 'VendorList',
            headerShown: false,
        })}
    >
        <VendorsStack.Screen
            name='VendorList'
            component={VendorsScreen}
            options={{ title: 'Vendors' }}
        />

        <VendorsStack.Screen
            name='Vendor'
            component={VendorScreen}
            options={{ title: 'Vendor' }}
        />
        
    </VendorsStack.Navigator>
)

const ProductsStack = createNativeStackNavigator()
const ProductsStackScreen = () => (
    <ProductsStack.Navigator
        screenOptions={() => ({
            initialRouteName: 'ProductList',
            headerShown: false,
        })}
    >
        <ProductsStack.Screen
            name='ProductList'
            component={ProductsScreen}
            options={{ title: 'Products' }}
        />
        
    </ProductsStack.Navigator>
)

const DriversStack = createNativeStackNavigator()
const DriversStackScreen = () => (
    <DriversStack.Navigator
        screenOptions={() => ({
            initialRouteName: 'DriverList',
            headerShown: false,
        })}
    >
        <DriversStack.Screen
            name='DriverList'
            component={DriversScreen}
            options={{ title: 'Drivers' }}
        />

        <DriversStack.Screen
            name='Driver'
            component={DriverScreen}
            options={{ title: 'Driver' }}
        />
        
    </DriversStack.Navigator>
)

const PrivateStack = createMaterialBottomTabNavigator()
// const PrivateStack = createBottomTabNavigator()
const PrivateStackScreen = () => {

    const theme = useTheme()

    const { user } = useContext(AppContext)
    
    const getInitialRouteName = () => {
        if (!user || !user.role) return 'Orders'
        switch (user.role) {
            case 'customer': return 'Vendors'; break
            case 'vendor':
            case 'driver': return 'Orders'; break
        }
    }
    const iconSize = 24
    return (
        <PrivateStack.Navigator
            initialRouteName={getInitialRouteName()}
            activeColor={theme?.colors.tabActive}
            inactiveColor={theme?.colors.tabInactive}
            barStyle={{ backgroundColor: theme?.colors.tabBackground }}
            screenOptions={{
                headerShown: false,
                // tabBarShowLabel: false,
                // tabBarActiveTintColor: '#fff',
                // tabBarLabelStyle: { fontSize: 18 },
                // tabBarStyle: { backgroundColor: '#000' },
            }}
        >
            <PrivateStack.Screen
                name='Orders'
                component={OrderScreen}
                options={{
                    tabBarLabel: 'Orders',
                    tabBarIcon: ({ focused, color }) => (
                        <Icon name='alert-circle-outline' size={iconSize} color={color} />
                    ),
                }}
            />

            {(user && user.role === 'vendor') && (
                <PrivateStack.Screen
                    name='Products'
                    component={ProductsStackScreen}
                    options={{
                        tabBarLabel: 'Products',
                        tabBarIcon: ({ focused, color }) => (
                            <Icon name='grid-outline' size={iconSize} color={color} />
                        ),
                    }}
                />
            )}

            {user && user.role !== 'vendor' && user.role !== 'driver' && (
                <PrivateStack.Screen
                    name='Vendors'
                    component={VendorsStackScreen}
                    options={{
                        tabBarLabel: 'Vendors',
                        tabBarIcon: ({ focused, color }) => (
                            <Icon name='fast-food-outline' size={iconSize} color={color} />
                        ),
                    }}
                />
            )}

            {user && user.role !== 'driver' && (
                <PrivateStack.Screen
                    name='Users'
                    component={UsersStackScreen}
                    options={{
                        tabBarLabel: 'Users',
                        tabBarIcon: ({ focused, color }) => (
                            <Icon name='people-circle-outline' size={iconSize} color={color} />
                        ),
                    }}
                />
            )}

            <PrivateStack.Screen
                name='Drivers'
                component={DriversStackScreen}
                options={{
                    tabBarLabel: 'Drivers',
                    tabBarIcon: ({ focused, color }) => (
                        <Icon name='car-sport-outline' size={iconSize} color={color} />
                    ),
                }}
            />

            <PrivateStack.Screen
                name='Forum'
                component={ForumScreen}
                options={{
                    tabBarLabel: 'Forum',
                    tabBarIcon: ({ focused, color }) => (
                        <Icon name='chatbubble-outline' size={iconSize} color={color} />
                    ),
                }}
            />

            <PrivateStack.Screen
                name='Images'
                component={ImagesScreen}
                options={{
                    tabBarLabel: 'Images',
                    tabBarIcon: ({ focused, color }) => (
                        <Icon name='images-outline' size={iconSize} color={color} />
                    ),
                }}
            />
            
            <PrivateStack.Screen
                name='Settings'
                component={SettingsScreen}
                options={{
                    tabBarLabel: 'Settings',
                    tabBarIcon: ({ focused, color }) => (
                        <Icon name='cog' size={iconSize} color={color} />
                    ),
                }}
            />

        </PrivateStack.Navigator>
    )
}

const MainStack = createNativeStackNavigator()
const MainStackScreen = () => (
    <MainStack.Navigator
        screenOptions={() => ({
            initialRouteName: 'Start',
            headerShown: false,
        })}
    >

        <MainStack.Screen
            name='Start'
            component={StartScreen}
            options={{ title: 'Start' }}
        />

        <MainStack.Screen
            name='Private'
            component={PrivateStackScreen}
            options={{ title: 'Private' }}
        />
        
    </MainStack.Navigator>
)

const config = {
    screens: {
        Start: 'start',
        Private: {
            path: '',
            screens: {
                Orders: {
                    path: 'orders',
                    screens: {
                        OrderList: '',
                    },
                },
                Products: {
                    path: 'products',
                    screens: {
                        ProductList: '',
                    },
                },
                Users: {
                    path: 'users',
                    screens: {
                        UserList: '',
                        User: '/:id',
                    },
                },
                Vendors: {
                    path: 'vendors',
                    screens: {
                        VendorList: '',
                        Vendor: '/:id',
                    },
                },
                Drivers: {
                    path: 'drivers',
                    screens: {
                        DriverList: '',
                        Driver: '/:id',
                    },
                },
                Forum: 'forum',
                Images: 'images',
                Settings: 'settings',
            },
        },
    },
}

export default () => {

    const {
        user,
    } = useContext(AppContext)
    
    useEffect(() => {
        if (user) {
            console.log(`${user.username} connected.`)
            navigationRef.navigate('Private')
        }
        else {
            console.log('no user connected.')
            navigationRef.navigate('Start')
        }
    }, [user])

    const linking = {
        prefixes: ['https://iameric.me'],
        config,
    }

    const theme = useTheme()

    return (
        <NavigationContainer
            ref={navigationRef}
            linking={linking}
            fallback={<FallbackScreen />}
            theme={theme}
            // onStateChange={async state => {}}
        >
            <MainStackScreen />
        </NavigationContainer>
    )
}
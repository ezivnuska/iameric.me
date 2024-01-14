import React, { useContext, useEffect, useState } from 'react'
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
    LoadingScreen,
    // MenuScreen,
    OrderScreen,
    ProductsScreen,
    SettingsScreen,
    SplashScreen,
    StartScreen,
    UsersScreen,
    VendorScreen,
    VendorsScreen,
} from '../screens'
import { navigationRef } from './RootNavigation'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/Ionicons'
import { AppContext } from '../AppContext'
import AsyncStorage from '@react-native-async-storage/async-storage'

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
        
        {/* <VendorsStack.Screen
            name='VendorDetails'
            component={VendorStackScreen}
            options={{ title: 'Vendor' }}
        /> */}
        
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

const PublicStack = createNativeStackNavigator()
const PublicStackScreen = () => {
    // console.log('yoyoy')
    return (
        <PublicStack.Navigator
            screenOptions={() => ({
                initialRouteName: 'Splash',
                headerShown: false,
            })}
        >
            <PublicStack.Screen
                name='Splash'
                component={SplashScreen}
                options={{ title: 'Splash' }}
            />
    
            <PublicStack.Screen
                name='Start'
                component={StartScreen}
                options={{ title: 'Start' }}
            />
            
        </PublicStack.Navigator>
    )
}

const PrivateStack = createBottomTabNavigator()
const PrivateStackScreen = ({ user }) => (
    <PrivateStack.Navigator
        initialRouteName='Orders'
        screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarActiveTintColor: '#fff',
            tabBarLabelStyle: { fontSize: 18 },
            tabBarStyle: { backgroundColor: '#000' },
        }}
    >
        <PrivateStack.Screen
            name='Orders'
            component={OrderScreen}
            options={{
                tabBarLabel: 'Orders',
                tabBarIcon: ({ focused, color, size }) => (
                    <Icon name='alert-circle-outline' size={size} color={color} />
                ),
            }}
        />

        {(user && user.role === 'vendor') && (
            <PrivateStack.Screen
                name='Products'
                component={ProductsStackScreen}
                options={{
                    tabBarLabel: 'Products',
                    tabBarIcon: ({ focused, color, size }) => (
                        <Icon name='grid-outline' size={size} color={color} />
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
                    tabBarIcon: ({ focused, color, size }) => (
                        <Icon name='fast-food-outline' size={size} color={color} />
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
                    tabBarIcon: ({ focused, color, size }) => (
                        <Icon name='people-circle-outline' size={size} color={color} />
                    ),
                }}
            />
        )}

        <PrivateStack.Screen
            name='Drivers'
            component={DriversStackScreen}
            options={{
                tabBarLabel: 'Drivers',
                tabBarIcon: ({ focused, color, size }) => (
                    <Icon name='car-sport-outline' size={size} color={color} />
                ),
            }}
        />

        <PrivateStack.Screen
            name='Forum'
            component={ForumScreen}
            options={{
                tabBarLabel: 'Forum',
                tabBarIcon: ({ focused, color, size }) => (
                    <Icon name='chatbubble-outline' size={size} color={color} />
                ),
            }}
        />

        <PrivateStack.Screen
            name='Images'
            component={ImagesScreen}
            options={{
                tabBarLabel: 'Images',
                tabBarIcon: ({ focused, color, size }) => (
                    <Icon name='images-outline' size={size} color={color} />
                ),
            }}
        />
        
        <PrivateStack.Screen
            name='Settings'
            component={SettingsScreen}
            options={{
                tabBarLabel: 'Settings',
                tabBarIcon: ({ focused, color, size }) => (
                    <Icon name='cog' size={size} color={color} />
                ),
            }}
        />

    </PrivateStack.Navigator>
)

// const MainStack = createNativeStackNavigator()
// const MainStackScreen = () => (
//     <MainStack.Navigator
//         screenOptions={() => ({
//             initialRouteName: 'Public',
//             headerShown: false,
//         })}
//     >
//         <MainStack.Screen
//             name='Public'
//             component={PublicStackScreen}
//             options={{ title: 'Public' }}
//         />

//         <MainStack.Screen
//             name='Private'
//             component={PrivateStackScreen}
//             options={{ title: 'Private' }}
//         />
        
//     </MainStack.Navigator>
// )

const config = {
    screens: {
        Orders: {
            path: '',
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
}

// const config = {
//     screens: {
//         Public: {
//             path: 'start',
//             screens: {
//                 Splash: {
//                     path: 'splash',
//                 },
//                 Start: {
//                     path: ''
//                 },
//             },
//         },
//         Private: {
//             path: '',
//             screens: {
//                 Orders: {
//                     path: 'orders',
//                     screens: {
//                         OrderList: '',
//                     },
//                 },
//                 Products: {
//                     path: 'products',
//                     screens: {
//                         ProductList: '',
//                     },
//                 },
//                 Users: {
//                     path: 'users',
//                     screens: {
//                         UserList: '',
//                         User: '/:id',
//                     },
//                 },
//                 Vendors: {
//                     path: 'vendors',
//                     screens: {
//                         VendorList: '',
//                         Vendor: '/:id',
//                     },
//                 },
//                 Drivers: {
//                     path: 'drivers',
//                     screens: {
//                         DriverList: '',
//                         Driver: '/:id',
//                     },
//                 },
//                 Forum: 'forum',
//                 Images: 'images',
//                 Settings: 'settings',
//             },
//         },
//     },
// }

export default () => {

    const {
        dispatch,
        loaded,
        loading,
        user,
    } = useContext(AppContext)
    
    // useEffect(() => {
    //     // console.log(user ? `${user.username} connected.` : 'no user connected.')
    //     if (!loaded) checkForToken()
    // }, [loaded])

    // const checkForToken = async () => {
    //     const token = await AsyncStorage.getItem('userToken')
    //     if (!token && user) {
    //         console.log('dispatching SIGNOUT')
    //         dispatch({ type: 'SIGNOUT' })
    //     }
    // }

    const linking = {
        prefixes: ['https://iameric.me'],
        config,
    }

    if (!user) {
        if (loaded) return <StartScreen />
        else return <SplashScreen />
    }

    return (
        <NavigationContainer
            ref={navigationRef}
            linking={linking}
            // fallback={<FallbackScreen />}
            // onStateChange={async state => {}}
        >
            <PrivateStackScreen user={user} />
            
        </NavigationContainer>
    )
}
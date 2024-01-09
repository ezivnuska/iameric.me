import React, { useContext, useEffect, useState } from 'react'
import {
    NavigationContainer,
} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import {
    DetailsScreen,
    FallbackScreen,
    ForumScreen,
    ImagesScreen,
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

// const SecureStack = createBottomTabNavigator()
// const SecureStackScreen = () => {
//     return (
//         <SecureStack.Navigator
//             initialRouteName='Vendors'
//             screenOptions={{
//                 headerShown: false,
//                 tabBarShowLabel: false,
//                 tabBarActiveTintColor: '#fff',
//                 tabBarLabelStyle: { fontSize: 18 },
//                 tabBarStyle: { backgroundColor: '#000' },
//             }}
//         >
//             <SecureStack.Screen
//                 name='Vendors'
//                 component={VendorsStackScreen}
//                 options={{
//                     tabBarLabel: 'Vendors',
//                     tabBarIcon: ({ focused, color, size }) => (
//                         <Icon name='fast-food-outline' size={size} color={color} />
//                     ),
//                 }}
//             />

//             <SecureStack.Screen
//                 name='Users'
//                 component={UsersStackScreen}
//                 options={{
//                     tabBarLabel: 'Users',
//                     tabBarIcon: ({ focused, color, size }) => (
//                         <Icon name='people-circle-outline' size={size} color={color} />
//                     ),
//                 }}
//             />

//             <SecureStack.Screen
//                 name='Forum'
//                 component={ForumScreen}
//                 options={{
//                     tabBarLabel: 'Forum',
//                     tabBarIcon: ({ focused, color, size }) => (
//                         <Icon name='chatbubble-outline' size={size} color={color} />
//                     ),
//                 }}
//             />
            
//             <SecureStack.Screen
//                 name='Settings'
//                 component={SettingsScreen}
//                 options={{
//                     tabBarLabel: 'Settings',
//                     tabBarIcon: ({ focused, color, size }) => (
//                         <Icon name='cog' size={size} color={color} />
//                     ),
//                 }}
//             />

//             <SecureStack.Screen
//                 name='Images'
//                 component={ImagesScreen}
//                 options={{
//                     tabBarLabel: 'Images',
//                     tabBarIcon: ({ focused, color, size }) => (
//                         <Icon name='images-outline' size={size} color={color} />
//                     ),
//                 }}
//             />

//         </SecureStack.Navigator>
//     )
// }

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

// const OrdersStack = createNativeStackNavigator()
// const OrdersStackScreen = () => {

//     return (
//         <OrdersStack.Navigator
//             screenOptions={() => ({
//                 initialRouteName: 'OrderList',
//                 headerShown: false,
//             })}
//         >
//             <OrdersStack.Screen
//                 name='OrderList'
//                 component={OrderScreen}
//                 options={{ title: 'Orders' }}
//             />

//             {/* <OrdersStack.Screen
//                 name='Order'
//                 component={OrderScreen}
//                 options={{ title: 'Order' }}
//             /> */}
            
//         </OrdersStack.Navigator>
//     )
// }

// const VendorStack = createNativeStackNavigator()
// const VendorStackScreen = () => {

//     return (
//         <VendorStack.Navigator
//             screenOptions={() => ({
//                 initialRouteName: 'Vendor',
//                 headerShown: false,
//             })}
//         >
//             <VendorStack.Screen
//                 name='Vendor'
//                 component={VendorScreen}
//                 options={{ title: 'Vendor' }}
//             />

//             <VendorStack.Screen
//                 name='Menu'
//                 component={MenuScreen}
//                 options={{ title: 'Menu' }}
//             />
            
//         </VendorStack.Navigator>
//     )
// }

const VendorsStack = createNativeStackNavigator()
const VendorsStackScreen = () => {

    const {
        user,
    } = useContext(AppContext)

    return (
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
}

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

        {/* <ProductsStack.Screen
            name='Product'
            component={ProductScreen}
            options={{ title: 'Product' }}
        /> */}
        
    </ProductsStack.Navigator>
)

// const DriversStack = createNativeStackNavigator()
// const DriversStackScreen = () => (
//     <DriversStack.Navigator
//         screenOptions={() => ({
//             initialRouteName: 'DriverList',
//             headerShown: false,
//         })}
//     >
//         <DriversStack.Screen
//             name='DriverList'
//             component={DriversScreen}
//             options={{ title: 'Drivers' }}
//         />

//         <DriversStack.Screen
//             name='Driver'
//             component={DriverScreen}
//             options={{ title: 'Driver' }}
//         />
        
//     </DriversStack.Navigator>
// )

const PublicStack = createNativeStackNavigator()
const PublicStackScreen = () => (
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

const PrivateStack = createBottomTabNavigator()
const PrivateStackScreen = ({ user }) => {
    return (
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

            {(user.role === 'vendor') && (
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

            {user.role !== 'vendor' && user.role !== 'driver' && (
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

            {user.role !== 'driver' && (
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
}

const publicScreens = {
    screens: {
        Splash: 'splash',
        Start: 'start',
    },
}

const privateScreens = {
    screens: {
        Private: {
            path: '',
            screens: {
                Products: 'products',
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
                // Drivers: {
                //     path: 'drivers',
                //     screens: {
                //         DriverList: '',
                //         Driver: '/:id',
                //     },
                // },
                Orders: {
                    path: 'orders',
                    screens: {
                        OrderList: '',
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

    const [verified, setVerified] = useState(false)
    const [linking, setLinking] = useState(null)

    useEffect(() => {
        if (user && !verified) setVerified(true)
        if (!user && verified) setVerified(false)
        setLinking(getLinking())
    }, [user, verified])
    
    useEffect(() => {
        console.log('*** user ***', user)
    }, [user])

    // useEffect(() => {
    //     console.log('linking', linking)
    // }, [linking])

    const getLinking = () => ({
        prefixes: ['https://iameric.me'],
        config: (user && verified && linking) ? { ...publicScreens, ...privateScreens } : publicScreens,
    })

    return (
        <NavigationContainer
            ref={navigationRef}
            linking={linking}
            fallback={<FallbackScreen />}
            // onStateChange={async state => {}}
        >
            {user ? <PrivateStackScreen user={user} /> : <PublicStackScreen />}
        </NavigationContainer>
    )
}
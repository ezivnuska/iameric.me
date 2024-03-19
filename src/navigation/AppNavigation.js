import React, { useContext, useEffect } from 'react'
import {
    NavigationContainer,
} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation'
import {
    FallbackScreen,
    ForumScreen,
    ImagesScreen,
    OrderScreen,
    SettingsScreen,
    StartScreen,
    VendorScreen,
    VendorsScreen,
} from './screens'
import {
    ProductNavigator,
    UserNavigator,
} from './navigators'
import Icon from 'react-native-vector-icons/Ionicons'
import { navigationRef } from './RootNavigation'
import { useTheme } from 'react-native-paper'
import { authenticate } from '@utils/auth'
import { AppContext } from '../AppContext'
import AsyncStorage from '@react-native-async-storage/async-storage'

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

const TabStack = createMaterialBottomTabNavigator()
const TabStackScreen = ({ user }) => {
    
    const theme = useTheme()

    return (
        <TabStack.Navigator
            initialRouteName={'Forum'}
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
                component={UserNavigator}
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

            {user.role !== 'vendor' && user.role !== 'driver' && (
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
            )}

        </TabStack.Navigator>
    )
}

const SettingsStack = createMaterialBottomTabNavigator()
const SettingsStackScreen = ({ user }) => {
    const theme = useTheme()
    return (
        <SettingsStack.Navigator
            initialRouteName={'Profile'}
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
                options={({ route, navigation }) => ({
                    tabBarLabel: 'Images',
                    tabBarIcon: ({ focused, color }) => (
                        <Icon name='images-outline' size={iconSize} color={color} />
                    ),
                })}
            />

            {user.role === 'vendor' && (
                <SettingsStack.Screen
                    name='Products'
                    component={ProductNavigator}
                    options={{
                        tabBarLabel: 'Products',
                        tabBarIcon: ({ focused, color }) => (
                            <Icon name='grid-outline' size={iconSize} color={color} />
                        ),
                    }}
                />
            )}
        </SettingsStack.Navigator>
    )
}

const SecureStack = createNativeStackNavigator()
const SecureStackScreen = () => (
    <SecureStack.Navigator
        initialRouteName='Tabs'
        screenOptions={() => ({
            headerShown: false,
        })}
    >
        <SecureStack.Screen
            name='Tabs'
            component={TabStackScreen}
            // options={{ title: 'Tabs' }}
        />

        <SecureStack.Screen
            name='Settings'
            component={SettingsStackScreen}
            options={{ title: 'Settings' }}
        />

    </SecureStack.Navigator>
)

const AppStack = createNativeStackNavigator()
const AppStackScreen = ({ user }) => (
    <AppStack.Navigator
        initialRouteName='SignIn'
        screenOptions={() => ({
            headerShown: false,
        })}
    >
        <AppStack.Screen
            name='SignIn'
            component={StartScreen}
            options={{ title: 'Sign In' }}
        />
        {/* <AppStack.Screen
            name='Secure'
            component={SecureStackScreen}
            // options={{ title: 'Tabs' }}
        /> */}

        {user && (
            <AppStack.Group>
                <AppStack.Screen
                    name='Tabs'
                    // component={TabStackScreen}
                    children={() => <TabStackScreen user={user} />}
                    // options={{ title: 'Tabs' }}
                />

                <AppStack.Screen
                    name='Settings'
                    children={() => <SettingsStackScreen user={user} />}
                    // component={SettingsStackScreen}
                    options={{ title: 'Settings' }}
                />
            </AppStack.Group>
        )}

        <AppStack.Screen
            name='Fallback'
            component={FallbackScreen}
            options={{ title: 'Page not found' }}
        />
    </AppStack.Navigator>
)

const linking = {
    prefixes: ['https://iameric.me'],
    config: {
        screens: {
            SignIn: 'signin',
            Tabs: {
                path: '',
                screens: {
                    Orders: {
                        path: 'orders',
                        screens: {
                            OrderList: '',
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

    const theme = useTheme()

    const {
        dispatch,
        loading,
        user,
    } = useContext(AppContext)

    useEffect(() => {
        checkAuthStatus()
    }, [])

    const checkAuthStatus = async () => {
        console.log('checking auth status')
        const token = await AsyncStorage.getItem('userToken')
        if (!token) {
            console.log('user not verified')
        } else {
            await authenticate(dispatch, token)
        }
    }

    useEffect(() => {
        if (user) {
            const currentRoute = navigationRef.getCurrentRoute()
            if (currentRoute.name === 'SignIn') {
                console.log('<navigating to tabs>')
                navigationRef.navigate('Tabs')
            }
        }
    }, [user])

    return (
        <NavigationContainer
            ref={navigationRef}
            linking={linking}
            fallback={<FallbackScreen />}
            theme={theme}
            // onStateChange={async state => {}}
        >
            <AppStackScreen user={user} />
        </NavigationContainer>
    )
}
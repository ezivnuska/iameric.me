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
    ProfileScreen,
    SplashScreen,
    StartScreen,
    VendorScreen,
    VendorsScreen,
} from '../screens'
import Icon from 'react-native-vector-icons/Ionicons'
import { navigationRef } from './RootNavigation'
import { useApp } from '@context'

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

const UserStack = createMaterialBottomTabNavigator()
const UserStackScreen = () => {
    const { theme } = useApp()
    return (
        <UserStack.Navigator
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

            <UserStack.Screen
                name='Profile'
                component={ProfileScreen}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ focused, color }) => (
                        <Icon name='alert-circle-outline' size={iconSize} color={color} />
                    ),
                }}
            />

            <UserStack.Screen
                name='Images'
                component={ImagesScreen}
                options={{
                    tabBarLabel: 'Images',
                    tabBarIcon: ({ focused, color }) => (
                        <Icon name='alert-circle-outline' size={iconSize} color={color} />
                    ),
                }}
            />

            <UserStack.Screen
                name='Products'
                component={ProductsScreen}
                options={{
                    tabBarLabel: 'Products',
                    tabBarIcon: ({ focused, color }) => (
                        <Icon name='alert-circle-outline' size={iconSize} color={color} />
                    ),
                }}
            />

        </UserStack.Navigator>
    )
}

const MainStack = createMaterialBottomTabNavigator()
const MainStackScreen = () => {
    const { theme } = useApp()
    return (
        <MainStack.Navigator
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
            <MainStack.Screen
                name='Forum'
                component={ForumScreen}
                options={{
                    title: 'Forum',
                    tabBarLabel: 'Forum',
                    tabBarIcon: ({ focused, color }) => (
                        <Icon name='alert-circle-outline' size={iconSize} color={color} />
                    ),
                }}
            />

            {/* <MainStack.Screen
                name='Orders'
                component={OrderScreen}
                options={{ title: 'Orders' }}
            /> */}

            <MainStack.Screen
                name='Users'
                component={ContactListScreen}
                options={{
                    title: 'Users',
                    tabBarLabel: 'Users',
                    tabBarIcon: ({ focused, color }) => (
                        <Icon name='alert-circle-outline' size={iconSize} color={color} />
                    ),
                }}
            />

            <MainStack.Screen
                name='Vendors'
                component={VendorStackScreen}
                options={{
                    title: 'Vendors',
                    tabBarLabel: 'Vendors',
                    tabBarIcon: ({ focused, color }) => (
                        <Icon name='alert-circle-outline' size={iconSize} color={color} />
                    ),
                }}
            />

        </MainStack.Navigator>
    )
}

const AuthStack = createNativeStackNavigator()
const AuthStackScreen = () => {
    return (
        <AuthStack.Navigator
            initialRouteName='User'
            screenOptions={{
                headerShown: false,
            }}
        >
            <AuthStack.Screen
                name='Main'
                component={MainStackScreen}
            />

            <AuthStack.Screen
                name='User'
                component={UserStackScreen}
                options={{ title: 'User' }}
            />

        </AuthStack.Navigator>
    )
}

const AppStack = createNativeStackNavigator()
const AppStackScreen = () => {
    return (
        <AppStack.Navigator
            initialRouteName='Splash'
            screenOptions={{
                headerShown: false,
            }}
        >

            <AppStack.Screen
                name='Splash'
                component={SplashScreen}
                options={{ title: 'Splash' }}
            />

            <AppStack.Screen
                name='Start'
                component={StartScreen}
                options={{ title: 'Start' }}
            />

            <AppStack.Screen
                name='Auth'
                component={AuthStackScreen}
            />

            <AppStack.Screen
                name='Fallback'
                component={FallbackScreen}
                options={{ title: 'Oops' }}
            />

        </AppStack.Navigator>
    )
}

const linking = {
    // enabled: false,
    prefixes: ['https://iameric.me'],
    config: {
        screens: {
            Auth: {
                path: '',
                screens: {
                    User: {
                        path: 'user',
                        screens: {
                            Images: 'images',
                            Products: 'products',
                            Profile: 'profile',
                        },
                    },
                    Main: {
                        path: '',
                        screens: {
                            Forum: 'forum',
                            // Orders: 'orders',
                            Users: 'users',
                            Vendors: {
                                path: 'vendors',
                                screens: {
                                    VendorList: '',
                                    Vendor: '/:id',
                                },
                            },
                        },
                    },
                },
            },
            Fallback: 'oops',
            Splash: 'splash',
            Start: 'start',
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
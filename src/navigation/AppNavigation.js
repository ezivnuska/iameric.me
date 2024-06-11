import React from 'react'
import {
    NavigationContainer,
} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation'
import {
    ContactsScreen,
    FallbackScreen,
    ForumScreen,
    ImagesScreen,
    // OrderScreen,
    ProductsScreen,
    ProfileScreen,
    SplashScreen,
    StartScreen,
    VendorScreen,
    VendorsScreen,
} from '@screens'
import Icon from 'react-native-vector-icons/Ionicons'
import { navigationRef } from './RootNavigation'
import {
    useApp,
} from '@context'

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
                name='Products'
                component={ProductsScreen}
                options={{
                    tabBarLabel: 'Products',
                    tabBarIcon: ({ focused, color }) => (
                        <Icon name='alert-circle-outline' size={iconSize} color={color} />
                    ),
                }}
            />

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

        </UserStack.Navigator>
    )
}

const MainStack = createMaterialBottomTabNavigator()
const MainStackScreen = () => {
    const {
        theme,
        userId,
    } = useApp()
    
    return (
        <MainStack.Navigator
            initialRouteName={'Home'}
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
                name='Home'
                component={StartScreen}
                options={{
                    title: 'Home',
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ focused, color }) => (
                        <Icon name='home-outline' size={iconSize} color={color} />
                    ),
                }}
            />

            {userId && (
                <MainStack.Screen
                    name='Forum'
                    component={ForumScreen}
                    options={{
                        title: 'Forum',
                        tabBarLabel: 'Forum',
                        tabBarIcon: ({ focused, color }) => (
                            <Icon name='chatbubbles-outline' size={iconSize} color={color} />
                        ),
                    }}
                />
            )}

            <MainStack.Screen
                name='Vendors'
                component={VendorStackScreen}
                options={{
                    title: 'Vendors',
                    tabBarLabel: 'Vendors',
                    tabBarIcon: ({ focused, color }) => (
                        <Icon name='restaurant-outline' size={iconSize} color={color} />
                    ),
                }}
            />

            <MainStack.Screen
                name='Users'
                component={ContactsScreen}
                options={{
                    title: 'Contacts',
                    tabBarLabel: 'Contacts',
                    tabBarIcon: ({ focused, color }) => (
                        <Icon name='people-outline' size={iconSize} color={color} />
                    ),
                }}
            />

        </MainStack.Navigator>
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
                name='User'
                component={UserStackScreen}
            />

            <AppStack.Screen
                name='Main'
                component={MainStackScreen}
                options={{ title: 'Main' }}
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
                    Home: '',
                    Forum: 'forum',
                    Vendors: {
                        path: 'vendors',
                        screens: {
                            VendorList: '',
                            Vendor: '/:id',
                        },
                    },
                    // Orders: 'orders',
                    Users: 'users',
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
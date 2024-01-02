import React from 'react'
import {
    NavigationContainer,
} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import {
    DetailsScreen,
    FallbackScreen,
    ForumScreen,
    ImagesScreen,
    MenuScreen,
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

const SecureStack = createBottomTabNavigator()
const SecureStackScreen = () => {
    return (
        <SecureStack.Navigator
            initialRouteName='Vendors'
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarActiveTintColor: '#fff',
                tabBarLabelStyle: { fontSize: 18 },
                tabBarStyle: { backgroundColor: '#000' },
            }}
        >
            <SecureStack.Screen
                name='Vendors'
                component={VendorsStackScreen}
                options={{
                    tabBarLabel: 'Vendors',
                    tabBarIcon: ({ focused, color, size }) => (
                        <Icon name='fast-food-outline' size={size} color={color} />
                    ),
                }}
            />

            <SecureStack.Screen
                name='Users'
                component={UsersStackScreen}
                options={{
                    tabBarLabel: 'Users',
                    tabBarIcon: ({ focused, color, size }) => (
                        <Icon name='people-circle-outline' size={size} color={color} />
                    ),
                }}
            />

            <SecureStack.Screen
                name='Forum'
                component={ForumScreen}
                options={{
                    tabBarLabel: 'Forum',
                    tabBarIcon: ({ focused, color, size }) => (
                        <Icon name='chatbubble-outline' size={size} color={color} />
                    ),
                }}
            />
            
            <SecureStack.Screen
                name='Settings'
                component={SettingsScreen}
                options={{
                    tabBarLabel: 'Settings',
                    tabBarIcon: ({ focused, color, size }) => (
                        <Icon name='cog' size={size} color={color} />
                    ),
                }}
            />

            <SecureStack.Screen
                name='Images'
                component={ImagesScreen}
                options={{
                    tabBarLabel: 'Images',
                    tabBarIcon: ({ focused, color, size }) => (
                        <Icon name='images-outline' size={size} color={color} />
                    ),
                }}
            />

        </SecureStack.Navigator>
    )
}
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

const AuthStack = createNativeStackNavigator()
const AuthStackScreen = () => (
    <AuthStack.Navigator
        screenOptions={() => ({
            initialRouteName: 'Splash',
            headerShown: false,
        })}
    >
        <AuthStack.Screen
            name='Splash'
            component={SplashScreen}
            options={{ title: 'Splash' }}
        />

        <AuthStack.Screen
            name='Start'
            component={StartScreen}
            options={{ title: 'Start' }}
        />

        <AuthStack.Screen
            name='Secure'
            component={SecureStackScreen}
            options={{ title: 'iameric' }}
        />
        
    </AuthStack.Navigator>
)

const config = {
    screens: {
        Splash: 'splash',
        Start: 'start',
        Secure: {
            path: '',
            screens: {
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
                Images: 'images',
                Settings: 'settings',
            },
        },
    },
}

const linking = {
    prefixes: ['https://iameric.me'],
    config,
}

export default () => (
    <NavigationContainer
        ref={navigationRef}
        linking={linking}
        fallback={<FallbackScreen />}
        // onStateChange={async state => {}}
    >
        <AuthStackScreen />
    </NavigationContainer>
)
import React, { useContext, useEffect, useState } from 'react'
import {
    // LinkingOptions,
    NavigationContainer,
} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import {
    AuthScreen,
    ChatScreen,
    CustomerScreen,
    DriverScreen,
    FallbackScreen,
    HomeScreen,
    SettingsScreen,
    UserScreen,
    VendorDetailsScreen,
    VendorScreen,
} from '../screens'
import { navigationRef } from './RootNavigation'
import { AppContext } from '../AppContext'
import { Header } from '../layout'
import { Customer } from '../components'

const SecureStack = createNativeStackNavigator()
const SecureStackScreen = ({ navigation, route }) => (
    <SecureStack.Navigator
        screenOptions={() => ({
            initialRouteName: 'home',
            headerShown: false,
            // headerMode: 'screen',
            // header: () => <Header />,
        })}
    >
        <SecureStack.Screen
            name='home'
            component={HomeScreen}
        />
        <SecureStack.Screen
            name='settings'
            component={SettingsScreen}
        />
        <SecureStack.Screen
            name='users'
            component={UserScreen}
        />
        <SecureStack.Screen
            name='chat'
            component={ChatScreen}
        />
    </SecureStack.Navigator>
)

const CustomerStack = createNativeStackNavigator()
const CustomerStackScreen = ({ navigation, route }) => (
    <CustomerStack.Navigator
        screenOptions={() => ({
            initialRouteName: 'home',
            headerShown: false,
        })}
    >
        <CustomerStack.Screen
            name='home'
            component={CustomerScreen}
        />
        <CustomerStack.Screen
            name='vendor'
            component={VendorDetailsScreen}
        />
        <SecureStack.Screen
            name='settings'
            component={SettingsScreen}
        />
    </CustomerStack.Navigator>
)

const DriverStack = createNativeStackNavigator()
const DriverStackScreen = ({ navigation, route }) => (
    <DriverStack.Navigator
        screenOptions={() => ({
            initialRouteName: 'home',
            headerShown: false,
        })}
    >
        <DriverStack.Screen
            name='home'
            component={DriverScreen}
        />
        <SecureStack.Screen
            name='settings'
            component={SettingsScreen}
        />
    </DriverStack.Navigator>
)

const VendorStack = createNativeStackNavigator()
const VendorStackScreen = ({ navigation, route }) => (
    <VendorStack.Navigator
        screenOptions={() => ({
            initialRouteName: 'home',
            headerShown: false,
        })}
    >
        <VendorStack.Screen
            name='home'
            component={VendorScreen}
        />
        <SecureStack.Screen
            name='settings'
            component={SettingsScreen}
        />
    </VendorStack.Navigator>
)

const AuthStack = createNativeStackNavigator()
const AuthStackScreen = ({ navigation, route }) => (
    <AuthStack.Navigator
        screenOptions={() => ({
            initialRouteName: 'auth',
            headerShown: false,
            // headerMode: 'screen',
            // header: () => <Header />,
        })}
    >
        <AuthStack.Screen
            name='auth'
            component={AuthScreen}
        />
    </AuthStack.Navigator>
)

const Navigation = () => {

    const { user } = useContext(AppContext)

    const config = {
        screens: {
            initialRouteName: 'auth',
            auth: {
                screens: {
                    auth: '/',
                }
            },
            secure: {
                screens: {
                    home: 'home',
                    settings: 'settings',
                    users: 'users',
                    chat: 'chat',
                    user: 'user',
                },
            },
            fallback: '*',
        },
    }

    const linking = {
        prefixes: ['http://iameric.me/', 'iameric.me', 'localhost:8081'],
        config,
    }

    const renderSecureStack = () => {
        switch(user && user.role) {
            case 'customer':
                return <CustomerStackScreen />
            break
            case 'driver':
                return <DriverStackScreen />
            break
            case 'vendor':
                return <VendorStackScreen />
            break
            default:
                return <AuthStackScreen />
        }
    }

    return (
        <View></View>
        // <NavigationContainer
        //     ref={navigationRef}
        //     // linking={linking}
        //     fallback={<FallbackScreen />}
        // >
        //     {renderSecureStack()}
        // </NavigationContainer>
    )
}

export default Navigation
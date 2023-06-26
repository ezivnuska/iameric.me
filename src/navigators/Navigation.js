import React, { useContext, useEffect, useState } from 'react'
import {
    // LinkingOptions,
    NavigationContainer,
} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import {
    AuthScreen,
    ChatScreen,
    FallbackScreen,
    HomeScreen,
    SettingsScreen,
    UserScreen,
} from '../screens'
import { navigationRef } from './RootNavigation'
import { AppContext } from '../AppContext'
// import { Header } from '../layout'

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

    const { state, user } = useContext(AppContext)

    // useEffect(() => {
    //     console.log('user changed', user)
    // }, [user])

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

    return (
        <NavigationContainer
            ref={navigationRef}
            // linking={linking}
            fallback={<FallbackScreen />}
        >
            {
                user
                    ? <SecureStackScreen />
                    : <AuthStackScreen />
            }
        </NavigationContainer>
    )
}

export default Navigation
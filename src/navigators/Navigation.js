import React, { useContext, useEffect, useState } from 'react'
import { LinkingOptions, NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import {
    AuthScreen,
    FallbackScreen,
    PrivateScreen,
    SettingsScreen,
    UserListScreen,
} from '../screens'
import { navigationRef } from './RootNavigation'
import { AppContext } from '../AppContext'

const AppStack = createNativeStackNavigator()
const AppStackScreen = ({ navigation, route }) => (
    <AppStack.Navigator
        screenOptions={{
            headerShown: false,
            initialRouteName: 'auth',
        }}
    >
        <AppStack.Screen
            name='auth'
            component={AuthScreen}
        />
        <AppStack.Screen
            name='private'
            component={PrivateScreen}
        />
        <AppStack.Screen
            name='settings'
            component={SettingsScreen}
        />
        <AppStack.Screen
            name='users'
            component={UserListScreen}
        />
    </AppStack.Navigator>
)

const Navigation = () => {

    const { state } = useContext(AppContext)
    const { user } = state

    useEffect(() => {
        if (user) console.log('user changed', user.username)
    }, [user])

    const config = {
        screens: {
            app: {
                initialRouteName: 'auth',
                screens: {
                    auth: '/',
                    private: 'private',
                    settings: 'settings',
                    users: 'users',
                },
            },
            fallback: '*',
        },
    }

    const linking = {
        prefixes: ['http://iameric.me/', 'iameric.me', 'localhost:8080'],
        config,
    }

    return (
        <SafeAreaProvider>
            <NavigationContainer
                ref={navigationRef}
                linking={linking}
                fallback={<FallbackScreen />}
            >
                <AppStackScreen />
            </NavigationContainer>
        </SafeAreaProvider>
        
    )
}

export default Navigation
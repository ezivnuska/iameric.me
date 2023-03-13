import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import {
    AuthScreen,
    FallbackScreen,
    SecureScreen,
    SettingsScreen,
} from '../screens'

import { navigationRef } from './RootNavigation'

const MainStack = createNativeStackNavigator()

const MainStackScreen = ({ navigation, route }) => (
    <MainStack.Navigator
        screenOptions={{
            headerShown: false,
        }}
    >
        <MainStack.Screen
            name='CheckIn'
            component={AuthScreen}
        />
        <MainStack.Screen
            name='Private'
            component={SecureScreen}
        />
        <MainStack.Screen
            name='Settings'
            component={SettingsScreen}
        />
        <MainStack.Screen
            name='Fallback'
            component={FallbackScreen}
        />
    </MainStack.Navigator>
)


const linking = {
    prefixes: ['http://iameric.me/', 'iameric.me', 'localhost:19006'],
    config: {
        initialRouteName: 'CheckIn',
        screens: {
            CheckIn: '/',
            SignIn: 'signin',
            SignUp: 'signup',
            Private: 'private',
            Settings: 'settings',
            Fallback: '*',
        },
    },
}

const Navigation = props => (
    <NavigationContainer
        ref={navigationRef}
        linking={linking}
        // fallback={<FallbackScreen />}
    >
        <MainStackScreen />
    </NavigationContainer>
)

export default Navigation
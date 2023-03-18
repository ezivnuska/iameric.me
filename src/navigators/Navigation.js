import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import {
    AuthScreen,
    // FallbackScreen,
    PrivateScreen,
    SettingsScreen,
} from '../screens'

import { navigationRef } from './RootNavigation'

const MainStack = createNativeStackNavigator()

const MainStackScreen = ({ navigation, route }) => (
    <MainStack.Navigator
        screenOptions={{
            headerShown: false,
            initialRouteName: 'Home',
        }}
    >
        <MainStack.Screen
            name='Home'
            component={AuthScreen}
        />
        <MainStack.Screen
            name='Private'
            component={PrivateScreen}
        />
        <MainStack.Screen
            name='Settings'
            component={SettingsScreen}
        />
        <MainStack.Screen
            name='NotFound'
            component={AuthScreen}
        />
    </MainStack.Navigator>
)


const linking = {
    // prefixes: ['http://iameric.me/', 'iameric.me', 'localhost:19006'],
    config: {
        initialRouteName: 'Home',
        screens: {
            Home: '/',
            SignIn: 'signin',
            SignUp: 'signup',
            Private: 'private',
            Settings: 'settings',
            NotFound: '*',
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
import React, { useContext } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import {
    CheckInScreen,
    FallbackScreen,
    SecureScreen,
    SettingsScreen,
    SignInScreen,
    SignUpScreen,
    PublicScreen,
} from '../screens'

import { AppContext } from '../AppContext'
import { navigationRef } from './RootNavigation'

const MainStack = createNativeStackNavigator()

const MainStackScreen = ({ navigation, route }) => {
    const { state } = useContext(AppContext)
    const { user } = state
    
    return (
        <MainStack.Navigator
        screenOptions={{
            headerShown: false,
        }}
        >
            <MainStack.Screen
                name='CheckIn'
                component={CheckInScreen}
            />
            
                {user ? (
                    <MainStack.Group>
                        <MainStack.Screen
                            name='Private'
                            component={SecureScreen}
                        />
                        <MainStack.Screen
                            name='Settings'
                            component={SettingsScreen}
                        />
                    </MainStack.Group>
                ) : (
                    <MainStack.Group>
                        <MainStack.Screen
                            name='Public'
                            component={PublicScreen}
                        />
                        <MainStack.Screen
                            name='SignIn'
                            component={SignInScreen}
                        />
                        <MainStack.Screen
                            name='SignUp'
                            component={SignUpScreen}
                        />
                    </MainStack.Group>
                )}
                <MainStack.Screen
                    name='Fallback'
                    component={FallbackScreen}
                />
        </MainStack.Navigator>
    )
}

const linking = {
    prefixes: ['http://iameric.me/', 'iameric.me', 'localhost:19006'],
    config: {
        initialRouteName: 'CheckIn',
        screens: {
            CheckIn: '/',
            SignIn: 'signin',
            SignUp: 'signup',
            Public: 'public',
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
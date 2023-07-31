import React, { useContext, useEffect, useState } from 'react'
import {
    NavigationContainer,
} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
    AuthScreen,
    DetailsScreen,
    FallbackScreen,
    SettingsScreen,
    SplashScreen,
    StartScreen,
    UserScreen,
} from '../screens'
import { navigationRef } from './RootNavigation'
import { AppContext } from '../AppContext'

// const AuthStack = createNativeStackNavigator()
// const AuthStackScreen = ({ navigation, route }) => (
//     <AuthStack.Navigator
//         screenOptions={() => ({
//             initialRouteName: 'auth',
//             headerShown: false,
//             // headerMode: 'screen',
//             // header: () => <Header />,
//         })}
//     >
//         <AuthStack.Screen
//             name='auth'
//             component={AuthScreen}
//         />
//     </AuthStack.Navigator>
// )

const Stack = createNativeStackNavigator()
const StackScreen = ({ navigation, route }) => {
    
    const { user, state } = useContext(AppContext)
    const { isLoading } = state
    
    if (isLoading) return <SplashScreen />

    return (
        <Stack.Navigator
        >
            {!user ? (
                <Stack.Screen
                    name='Start'
                    component={StartScreen}
                    options={{ title: 'Start' }}
                />
            ) : (
                <>
                    <Stack.Screen
                        name='Home'
                        component={UserScreen}
                        options={{ title: 'Home' }}
                    />

                    <Stack.Screen
                        name='Details'
                        component={DetailsScreen}
                        options={{ title: 'Details' }}
                    />

                    <Stack.Screen
                        name='Settings'
                        component={SettingsScreen}
                        options={{ title: 'Settings' }}
                    />
                </>
            )}
        </Stack.Navigator>
    )
}

const Navigation = () => {

    const saveRoute = async () => {
        const currentRoute = navigationRef.getCurrentRoute()
        const { name, params } = currentRoute
        if (name == 'Start') return
        const detail = params ? params.id : null
        await AsyncStorage.setItem('route', name)
        await AsyncStorage.setItem('detail', detail)
    }

    const config = {
        screens: {
            Start: '',
            Home: 'dashboard',
            Details: 'details/:id',
            Settings: 'settings',
            // initialRouteName: 'auth',
            // auth: {
            //     screens: {
            //         auth: '/',
            //     }
            // },
            // secure: {
            //     screens: {
            //         home: 'home',
            //         settings: 'settings',
            //         users: 'users',
            //         chat: 'chat',
            //         user: 'user',
            //     },
            // },
            // fallback: '*',
        },
    }

    const linking = {
        prefixes: ['http://iameric.me/', 'iameric.me', 'localhost:8081'],
        config,
    }

    return (
        <NavigationContainer
            ref={navigationRef}
            linking={linking}
            fallback={<FallbackScreen />}
            onStateChange={async () => await saveRoute()}
        >
            <StackScreen />
        </NavigationContainer>
    )
}

export default Navigation
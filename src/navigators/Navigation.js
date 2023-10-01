import React, { useContext, useEffect, useState } from 'react'
import {
    NavigationContainer,
} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
    DetailsScreen,
    FallbackScreen,
    HomeScreen,
    SettingsScreen,
    SplashScreen,
    StartScreen,
    UserScreen,
} from '../screens'
import { navigate, navigationRef } from './RootNavigation'
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
    
    const { loaded, loading, user } = useContext(AppContext)
    
    if (!loaded || loading) return <SplashScreen />
    if (!user) return <StartScreen />

    return (
        <Stack.Navigator
            screenOptions={() => ({
                initialRouteName: 'Home',
            })}
        >
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
            
        </Stack.Navigator>
    )
}

const Navigation = () => {

    const [route, setRoute] = useState(null)

    useEffect(() => {
        if (route) saveRoute()
    }, [route])

    const saveRoute = async () => {
        const { name, params } = route

        if (name === 'Start') return
        
        const detail = params ? params.id : null
        
        await AsyncStorage.setItem('route', name)

        if (detail) await AsyncStorage.setItem('detail', detail)
    }

    const config = {
        screens: {
            Start: '/',
            Home: '/dashboard',
            Details: '/details/:id',
            Settings: '/settings',
        },
    }

    const linking = {
        prefixes: ['http://iameric.me/', 'iameric.me', 'localhost:8080'],
        config,
    }

    return (
        <NavigationContainer
            ref={navigationRef}
            linking={linking}
            fallback={<FallbackScreen />}
            onStateChange={() => setRoute(navigationRef.getCurrentRoute())}
        >
            <StackScreen />
        </NavigationContainer>
    )
}

export default Navigation
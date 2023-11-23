import React, { useContext, useEffect, useState } from 'react'
import {
    NavigationContainer,
} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
    DetailsScreen,
    FallbackScreen,
    SettingsScreen,
    StartScreen,
    UserScreen,
} from '../screens'
import { navigationRef } from './RootNavigation'
import { AppContext } from '../AppContext'

const Stack = createNativeStackNavigator()
const StackScreen = ({ navigation, route }) => {
    
    const { user } = useContext(AppContext)

    return (
        <Stack.Navigator
            screenOptions={() => ({
                initialRouteName: 'Start',
            })}
        >
            
            {user ? (
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
            ) : (
                <Stack.Screen
                    name='Start'
                    component={StartScreen}
                    options={{ title: 'Welcome' }}
                />
            )}

            
        </Stack.Navigator>
    )
}

export default () => {

    const [route, setRoute] = useState(null)

    useEffect(() => {
        if (route) handleRouteChange()
        
    }, [route])

    const handleRouteChange = async () => {
        const { name, params } = route
        
        if (name !== 'Start') await AsyncStorage.setItem('route', name)
        else {
            await AsyncStorage.removeItem('route')
            return
        }
        
        if (params && params.id) await AsyncStorage.setItem('detail', params.id)
    }

    // const linking = {
    //     prefixes: ['https://iameric.me/', 'iameric.me', 'localhost:8080'],
    //     config,
    // }

    /**
     * Linking Configuration
     */
    
    const linking = {
        // Prefixes accepted by the navigation container, should match the added schemes
        prefixes: ['myapp://'],
        // Route config to map uri paths to screens
        config: {
            // Initial route name to be added to the stack before any further navigation,
            // should match one of the available screens
            initialRouteName: 'Home',
            screens: {
                // myapp://home -> HomeScreen
                Home: 'home',
                // myapp://details/1 -> DetailsScreen with param id: 1
                Details: "details/:id",
                // Start: '/splash',
                // Home: '/',
                // Details: '/details/:id',
                Settings: 'settings',
            },
        },
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
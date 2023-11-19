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
        if (route) saveRoute()
    }, [route])

    const saveRoute = async () => {
        const { name, params } = route

        if (name === 'Start') {
            await AsyncStorage.removeItem('route')
            await AsyncStorage.removeItem('detail')
            return
        }
        
        await AsyncStorage.setItem('route', name)
        
        if (params && params.id) await AsyncStorage.setItem('detail', params.id)
    }

    const config = {
        screens: {
            Start: '/splash',
            Home: '/',
            Details: '/details/:id',
            Settings: '/settings',
        },
    }

    const linking = {
        prefixes: ['https://iameric.me/', 'iameric.me', 'localhost:8080'],
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
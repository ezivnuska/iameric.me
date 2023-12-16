import React, { useContext, useEffect } from 'react'
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
    UsersScreen,
} from '../screens'
import { checkRoute, navigate, navigationRef } from './RootNavigation'
import { AppContext } from '../AppContext'
import { cleanStorage } from '../utils/storage'
import { authenticate } from '../Data'

const Stack = createNativeStackNavigator()
const StackScreen = () => {

    return (
        <Stack.Navigator
            screenOptions={() => ({
                initialRouteName: 'Start',
            })}
        >
            <Stack.Screen
                name='Start'
                component={StartScreen}
                options={{ title: 'Welcome' }}
            />

            <Stack.Screen
                name='Home'
                options={{ title: 'Home' }}
            >
                {(props) => <UserScreen {...props} />}
            </Stack.Screen>

            <Stack.Screen
                name='Details'
                options={{ title: 'Details' }}
            >
                {(props) => <DetailsScreen {...props} />}
            </Stack.Screen>

            <Stack.Screen
                name='Settings'
                options={{ title: 'Settings' }}
            >
                {(props) => <SettingsScreen {...props} />}
            </Stack.Screen>

            <Stack.Screen
                name='Forum'
                options={{ title: 'Forum' }}
            >
                {(props) => <UsersScreen {...props} />}
            </Stack.Screen>
            
        </Stack.Navigator>
    )
}

export default () => {

    const {
        dispatch,
        user,
    } = useContext(AppContext)
    
    useEffect(() => {
        if (user) checkRoute()
        else verifyUser()
    }, [user])

    const verifyUser = async () => {
        
        dispatch({ type: 'SET_LOADING', loading: 'Navigation: verifying user...' })
        const userToken = await AsyncStorage.getItem('userToken')
        
        if (!userToken) {
            await cleanStorage()
            dispatch({ type: 'SET_LOADING', loading: null })
            navigate('Start')
            return
        }

        const verifiedUser = await authenticate(userToken)
        
        dispatch({ type: 'SET_LOADING', loading: null })

        if (!verifiedUser) {
            await cleanStorage()
            navigate('Start')
            return
        }
        
        AsyncStorage.setItem('userToken', verifiedUser.token)
        dispatch({ type: 'SET_USER', user: verifiedUser })
    }

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
            initialRouteName: 'Start',
            screens: {
                Start: '',
                // myapp://home -> HomeScreen
                Home: 'home',
                // myapp://details/1 -> DetailsScreen with param id: 1
                Details: 'details/:id',
                // Start: '/splash',
                // Home: '/',
                // Details: '/details/:id',
                Settings: 'settings',
                Forum: 'forum',
            },
        },
    }

    return (
        <NavigationContainer
            ref={navigationRef}
            linking={linking}
            fallback={<FallbackScreen />}
            // onStateChange={async () => {
            //     const currentRoute = navigationRef.getCurrentRoute()
            //     console.log('STATE_CHANGE, currentRoute:', currentRoute)
                
            //     const prevRoute = await AsyncStorage.getItem('route')
            //     console.log('Saving current route as prev route:', prevRoute)

            //     await AsyncStorage.setItem('prevRoute', prevRoute)
            //     console.log('setting route???', currentRoute.name)
            //     await AsyncStorage.setItem('route', currentRoute.name)

            //     if (currentRoute.params && currentRoute.params.id) await AsyncStorage.setItem('detail', currentRoute.params.id)
            //     // await AsyncStorage.multiRemove(['prevRoute', 'route', 'detail'])
            // }}
        >
            <StackScreen />
        </NavigationContainer>
    )
}
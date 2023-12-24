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
    SplashScreen,
    StartScreen,
    UserScreen,
    UsersScreen,
} from '../screens'
import { checkRoute, navigate, navigationRef } from './RootNavigation'
import { AppContext } from '../AppContext'
import { cleanStorage } from '../utils/storage'
import { authenticate } from '../Data'

const SecureStack = createNativeStackNavigator()
const SecureStackScreen = () => {

    return (
        <SecureStack.Navigator
            screenOptions={() => ({
                initialRouteName: 'Home',
            })}
        >
            <SecureStack.Screen
                name='Home'
                options={{ title: 'Home' }}
            >
                {(props) => <UserScreen {...props} />}
            </SecureStack.Screen>

            <SecureStack.Screen
                name='Details'
                options={{ title: 'Details' }}
            >
                {(props) => <DetailsScreen {...props} />}
            </SecureStack.Screen>

            <SecureStack.Screen
                name='Settings'
                options={{ title: 'Settings' }}
            >
                {(props) => <SettingsScreen {...props} />}
            </SecureStack.Screen>

            <SecureStack.Screen
                name='Forum'
                options={{ title: 'Forum' }}
            >
                {(props) => <UsersScreen {...props} />}
            </SecureStack.Screen>
            
        </SecureStack.Navigator>
    )
}

const AuthStack = createNativeStackNavigator()
const AuthStackScreen = () => (
    <AuthStack.Navigator
        screenOptions={() => ({
            initialRouteName: 'Splash',
        })}
    >
        <AuthStack.Screen
            name='Splash'
            component={SplashScreen}
            options={{ title: 'Splash' }}
        />

        <AuthStack.Screen
            name='Start'
            component={StartScreen}
            options={{ title: 'Start' }}
        />

        <AuthStack.Screen
            name='Secure'
            component={SecureStackScreen}
            options={{ title: 'Secure' }}
        />
        
    </AuthStack.Navigator>
)

const config = {
    screens: {
        Splash: 'welcome',
        Start: 'connect',
        Secure: {
            path: '',
            screens: {
                Home: 'home',
                Details: 'details/:id',
                Settings: 'settings',
                Forum: 'forum',
            },
        },
    }
}

const linking = {
    prefixes: ['https://iameric.me'],
    config,
}

export default () => {

    const {
        dispatch,
        // loading,
        // user,
        // verified,
    } = useContext(AppContext)
    
    useEffect(() => {
        dispatch({ type: 'SET_LOADING', loading: 'Initializing...' })
        // init()
        // console.log('hello world')
    }, [])

    // const init = async () => {
    //     const oldUser = await checkUser()
    //     if (oldUser) {
    //         console.log('NAVIGATION:checkRoute')
    //         checkRoute()
    //     }
    // }

    // const linking = {
    //     prefixes: ['iameric://'],
    //     config: verified ? {
    //         initialRouteName: 'Home',
    //         screens: {
    //             Home: 'home',
    //             Details: 'details/:id',
    //             Settings: 'settings',
    //             Forum: 'forum',
    //         },
    //     } : {
    //         initialRouteName: 'Start',
    //         screens: {
    //             Start: '',
    //         },
    //     },
    // }

    // const checkUser = async () => {
        
    //     dispatch({ type: 'SET_LOADING', loading: 'Navigation: verifying user...' })
    //     const userToken = await AsyncStorage.getItem('userToken')
        
    //     if (!userToken) {
    //         await cleanStorage()
    //         dispatch({ type: 'SET_LOADING', loading: null })
    //         return null
    //     }

    //     const verifiedUser = await authenticate(userToken)
        
    //     dispatch({ type: 'SET_LOADING', loading: null })

    //     if (!verifiedUser) {
    //         await cleanStorage()
    //         return null
    //     }
        
    //     AsyncStorage.setItem('userToken', verifiedUser.token)
    //     dispatch({ type: 'SET_USER', user: verifiedUser })

    //     return verifiedUser
    // }

    /**
     * Linking Configuration
     */
    
    // const linking = {
    //     // Prefixes accepted by the navigation container, should match the added schemes
    //     prefixes: ['myapp://'],
    //     // Route config to map uri paths to screens
    //     config: {
    //         // Initial route name to be added to the stack before any further navigation,
    //         // should match one of the available screens
    //         initialRouteName: 'Splash',
    //         screens: {
    //             Splash: '/splash',
    //             Start: '',
    //             // myapp://home -> HomeScreen
    //             Home: 'home',
    //             // myapp://details/1 -> DetailsScreen with param id: 1
    //             Details: 'details/:id',
    //             // Start: '/splash',
    //             // Home: '/',
    //             // Details: '/details/:id',
    //             Settings: 'settings',
    //             Forum: 'forum',
    //         },
    //     },
    // }

    return (
        <NavigationContainer
            ref={navigationRef}
            linking={linking}
            fallback={<FallbackScreen />}
            // onStateChange={async state => {
            //     // const currentRoute = navigationRef.getCurrentRoute()
            //     // console.log('STATE_CHANGE, currentRoute:', currentRoute)

            //     console.log('STATE_CHANGE, state:', state)
                
            // //     const prevRoute = await AsyncStorage.getItem('route')
            // //     console.log('Saving current route as prev route:', prevRoute)

            // //     await AsyncStorage.setItem('prevRoute', prevRoute)
            // //     console.log('setting route???', currentRoute.name)
            // //     await AsyncStorage.setItem('route', currentRoute.name)

            // //     if (currentRoute.params && currentRoute.params.id) await AsyncStorage.setItem('detail', currentRoute.params.id)
            // //     // await AsyncStorage.multiRemove(['prevRoute', 'route', 'detail'])
            // }}
        >
            <AuthStackScreen />
        </NavigationContainer>
    )
}
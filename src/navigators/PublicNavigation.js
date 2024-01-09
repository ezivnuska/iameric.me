import React, { useContext, useEffect, useState } from 'react'
import {
    NavigationContainer,
} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import {
    DetailsScreen,
    FallbackScreen,
    ForumScreen,
    ImagesScreen,
    // MenuScreen,
    OrderScreen,
    ProductsScreen,
    SettingsScreen,
    SplashScreen,
    StartScreen,
    UsersScreen,
    VendorScreen,
    VendorsScreen,
} from '../screens'
import { navigationRef } from './RootNavigation'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/Ionicons'
import { AppContext } from '../AppContext'

const PublicStack = createNativeStackNavigator()
const PublicStackScreen = () => (
    <PublicStack.Navigator
        screenOptions={() => ({
            initialRouteName: 'Splash',
            headerShown: false,
        })}
    >
        <PublicStack.Screen
            name='Splash'
            component={SplashScreen}
            options={{ title: 'Splash' }}
        />

        <PublicStack.Screen
            name='Start'
            component={StartScreen}
            options={{ title: 'Start' }}
        />
        
    </PublicStack.Navigator>
)

const config = {
    screens: {
        Splash: {
            path: 'splash',
        },
        Start: {
            path: 'start'
        },
    },
}

export default () => {

    const {
        user,
    } = useContext(AppContext)

    const [verified, setVerified] = useState(false)

    useEffect(() => {
        if (user && !verified) setVerified(true)
        if (!user && verified) setVerified(false)
    }, [user, verified])
    
    useEffect(() => {
        console.log('*** user ***', user)
    }, [user])

    const linking = () => ({
        prefixes: ['https://iameric.me'],
        config,
    })

    return (
        <NavigationContainer
            ref={navigationRef}
            linking={linking}
            fallback={<FallbackScreen />}
            // onStateChange={async state => {}}
        >
            <PublicStackScreen />
        </NavigationContainer>
    )
}
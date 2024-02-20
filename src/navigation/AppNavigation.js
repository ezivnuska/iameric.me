import React from 'react'
import {
    NavigationContainer,
} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import {
    FallbackScreen,
    StartScreen,
} from './screens'
import {
    AdminTabNavigator,
    CustomerTabNavigator,
    DriverTabNavigator,
    VendorTabNavigator,
} from './navigators'
import { navigationRef } from './RootNavigation'
import { linking } from '.'
import { useTheme } from 'react-native-paper'

const StartStack = createNativeStackNavigator()
const StartStackScreen = () => (
    <StartStack.Navigator
        initialRouteName='Start'
        screenOptions={() => ({
            headerShown: false,
        })}
    >

        <StartStack.Screen
            name='Start'
            component={StartScreen}
            options={{ title: 'Start' }}
        />

        <StartStack.Screen
            name='Fallback'
            component={FallbackScreen}
            options={{ title: 'Page not found' }}
        />

    </StartStack.Navigator>
)

export default ({ user }) => {

    const theme = useTheme()

    const renderNavigator = () => {
        if (!user) return <StartStackScreen />
        switch(user.role) {
            case 'admin': return <AdminTabNavigator />
            case 'customer': return <CustomerTabNavigator />
            case 'driver': return <DriverTabNavigator />
            case 'vendor': return <VendorTabNavigator />
        }
    }

    return (
        <NavigationContainer
            ref={navigationRef}
            linking={linking}
            fallback={<FallbackScreen />}
            theme={theme}
            // onStateChange={async state => {}}
        >
            {renderNavigator()}
        </NavigationContainer>
    )
}
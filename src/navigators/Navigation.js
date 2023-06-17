import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import {
    HomeScreen,
} from '../screens'
import { navigationRef } from './RootNavigation'

const MainStack = createNativeStackNavigator()
const MainStackScreen = ({ navigation, route }) => (
    <MainStack.Navigator
        screenOptions={{
            headerShown: false,
            initialRouteName: 'home',
        }}
    >
        <MainStack.Screen
            name='home'
            component={HomeScreen}
        />
    </MainStack.Navigator>
)

const Navigation = () => (
    <SafeAreaProvider>
        <NavigationContainer ref={navigationRef}>
            <MainStackScreen />
        </NavigationContainer>
    </SafeAreaProvider>
    
)

export default Navigation
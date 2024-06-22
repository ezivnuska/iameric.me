import React from 'react'
import {
    NavigationContainer,
} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import {
    // FallbackScreen,
    HomeScreen,
} from '@screens'
import { navigationRef } from '@utils/navigate'

const linking = {
    prefixes: ['https://iameric.me'],
    config: {
        screens: {
            Home: {
                path: '',
            },
        },
    },
}

const AppStack = createNativeStackNavigator()
const AppStackScreen = () => {

    return (
        <AppStack.Navigator
            initialRouteName='Home'
            screenOptions={{
                headerShown: false,
            }}
        >

            <AppStack.Screen
                name='Home'
                // children={props => <HomeScreen {...props} />}
                component={HomeScreen}
                options={{ title: 'Home' }}
            />

        </AppStack.Navigator>
    )
}

export default ({ theme }) => {
    
    return (
        <NavigationContainer
            ref={navigationRef}
            linking={linking}
            theme={theme}
            // fallback={<FallbackScreen />} // not working or used, necessary as of yet
        >
            <AppStackScreen />
        </NavigationContainer>
    )
}
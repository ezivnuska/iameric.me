import React from 'react'
import {
    DetailsScreen,
    UsersScreen,
} from '../screens'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const UsersStack = createNativeStackNavigator()

export default () => (
    <UsersStack.Navigator
        initialRouteName='UserList'
        screenOptions={{
            headerShown: false,
        }}
    >
        <UsersStack.Screen
            name='UserList'
            component={UsersScreen}
            options={{ title: 'Users' }}
        />

        <UsersStack.Screen
            name='User'
            component={DetailsScreen}
            options={{
                title: 'User',
                unmountOnBlur: true,
            }}
        />
        
    </UsersStack.Navigator>
)
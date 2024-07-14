import React from 'react'
import {
    NavigationContainer,
} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import {
    ContactsScreen,
    ForumScreen,
    // FallbackScreen,
    HomeScreen,
    ImagesScreen,
    MailScreen,
    ProfileScreen,
} from '@screens'
import navigationRef from '@utils/navigation'

const linking = {
    prefixes: ['https://iameric.me'],
    config: {
        screens: {
            Contacts: {
                path: 'contacts',
            },
            Forum: {
                path: 'forum',
            },
            Home: {
                path: '',
            },
            Mail: {
                path: 'mail',
            },
            Profile: {
                path: 'profile',
                screens: {
                    Images: {
                        path: 'images',
                    },
                    User: {
                        path: '',
                    },
                },
            },
        },
    },
}

const UserStack = createNativeStackNavigator()
const UserStackScreen = () => {

    return (
        <UserStack.Navigator
            initialRouteName='Profile'
            screenOptions={{
                headerShown: false,
            }}
        >

            <UserStack.Screen
                name='User'
                children={props => <ProfileScreen {...props} />}
                // component={ProfileScreen}
                options={{ title: 'Profile' }}
            />

            <UserStack.Screen
                name='Images'
                children={props => <ImagesScreen {...props} />}
                // component={ImagesScreen}
                options={{ title: 'Images' }}
            />

        </UserStack.Navigator>
    )
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
                children={props => <HomeScreen {...props} />}
                // component={HomeScreen}
                options={{ title: 'Home' }}
            />

            <AppStack.Screen
                name='Contacts'
                children={props => <ContactsScreen {...props} />}
                // component={ContactsScreen}
                options={{ title: 'Contacts' }}
            />

            <AppStack.Screen
                name='Profile'
                children={props => <UserStackScreen {...props} />}
                // component={ProfileScreen}
                // options={{ title: 'Profile' }}
            />

            <AppStack.Screen
                name='Forum'
                children={props => <ForumScreen {...props} />}
                // component={ForumScreen}
                options={{ title: 'Forum' }}
            />

            <AppStack.Screen
                name='Mail'
                children={props => <MailScreen {...props} />}
                // component={MailScreen}
                options={{ title: 'Mail' }}
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
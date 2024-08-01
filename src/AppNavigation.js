import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import {
    ContactScreen,
    ContactsScreen,
    ForumScreen,
    // FallbackScreen,
    HomeScreen,
    ImagesScreen,
    MapScreen,
    MailScreen,
    ProfileScreen,
} from '@screens'

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
                name='Profile'
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

const ContactStack = createNativeStackNavigator()
const ContactStackScreen = () => {

    return (
        <ContactStack.Navigator
            initialRouteName='Details'
            screenOptions={{
                headerShown: false,
            }}
        >

            <ContactStack.Screen
                name='Details'
                children={props => <ContactScreen {...props} />}
                // component={ContactScreen}
                options={{ title: 'Contact' }}
            />

            <ContactStack.Screen
                name='ContactImages'
                children={props => <ImagesScreen {...props} />}
                // component={ImagesScreen}
                options={{ title: 'Images' }}
            />

        </ContactStack.Navigator>
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
                name='Contact'
                children={props => <ContactStackScreen {...props} />}
                // component={ContactsScreen}
                options={{ title: 'Contact' }}
            />

            <AppStack.Screen
                name='Contacts'
                children={props => <ContactsScreen {...props} />}
                // component={ContactsScreen}
                options={{ title: 'Contacts' }}
            />

            <AppStack.Screen
                name='Map'
                children={props => <MapScreen {...props} />}
                // component={MapScreen}
                options={{ title: 'Contacts' }}
            />

            <AppStack.Screen
                name='User'
                children={props => <UserStackScreen {...props} />}
                // component={ProfileScreen}
                options={{ title: 'Profile' }}
            />

            {/* <AppStack.Screen
                name='Images'
                children={props => <ImagesScreen {...props} />}
                // component={ImagesScreen}
                options={{ title: 'Images' }}
            /> */}

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

export default AppStackScreen

// moved into Layout

// {
    
//     return (
//         <NavigationContainer
//             ref={navigationRef}
//             linking={linking}
//             theme={theme}
//             // fallback={<FallbackScreen />} // not working or used, necessary as of yet
//         >
            
//         </NavigationContainer>
//     )
// }
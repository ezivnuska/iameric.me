import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import {
    BipScreen,
    BipsScreen,
    ContactScreen,
    ContactsScreen,
    ForumScreen,
    HomeScreen,
    ImagesScreen,
    MapScreen,
    MailScreen,
    PlayScreen,
    ProfileScreen,
    WorkScreen,
} from '@screens'

const BipStack = createNativeStackNavigator()
const BipStackScreen = () => {

    return (
        <BipStack.Navigator
            initialRouteName='BipList'
            screenOptions={{
                headerShown: false,
            }}
        >

            <BipStack.Screen
                name='BipList'
                children={props => <BipsScreen {...props} />}
                // component={BipsScreen}
                options={{ title: 'Bips' }}
            />

            <BipStack.Screen
                name='Bip'
                children={props => <BipScreen {...props} />}
                // component={BipScreen}
                options={{ title: 'Bip' }}
            />

            {/* <BipStack.Screen
                name='BipMap'
                children={props => <MapScreen {...props} />}
                // component={MapScreen}
                options={{ title: 'Map' }}
            /> */}

        </BipStack.Navigator>
    )
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
                name='Profile'
                children={props => <ProfileScreen {...props} />}
                // component={ProfileScreen}
                options={{ title: 'Profile' }}
            />

            <UserStack.Screen
                name='@images'
                children={props => <ImagesScreen {...props} />}
                // component={ImagesScreen}
                options={{ title: '@images' }}
            />

            <UserStack.Screen
                name='Map'
                children={props => <MapScreen {...props} />}
                // component={MapScreen}
                options={{ title: 'Map' }}
            />

        </UserStack.Navigator>
    )
}


const AboutStack = createNativeStackNavigator()
const AboutStackScreen = () => {

    return (
        <AboutStack.Navigator
            initialRouteName='Work'
            screenOptions={{
                headerShown: false,
            }}
        >

            <AboutStack.Screen
                name='Work'
                children={props => <WorkScreen {...props} />}
                // component={WorkScreen}
                options={{ title: 'Work' }}
            />

            <AboutStack.Screen
                name='Play'
                children={props => <PlayScreen {...props} />}
                // component={PlayScreen}
                options={{
                    title: 'Play',
                    gestureEnabled: false,
                }}
            />

        </AboutStack.Navigator>
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
                options={{ title: '@images' }}
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
                name='User'
                children={props => <UserStackScreen {...props} />}
                // component={ProfileScreen}
                options={{ title: 'Profile' }}
            />

            {/* <AppStack.Screen
                name='@images'
                children={props => <ImagesScreen {...props} />}
                // component={ImagesScreen}
                options={{ title: '@images' }}
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
            
            <AppStack.Screen
                name='About'
                children={props => <AboutStackScreen {...props} />}
                // component={AboutStackScreen}
                options={{ title: 'About' }}
            />

            <AppStack.Screen
                name='Bips'
                children={props => <BipStackScreen {...props} />}
                // component={BipStackScreen}
                options={{ title: 'Bips' }}
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
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import {
    // BipScreen,
    // BipsScreen,
    BugScreen,
    FeedScreen,
    HomeScreen,
    // MapScreen,
    // MailScreen,
    // PlayScreen,
    // SimpleScreen,
    WorkScreen,
} from '@screens'
import { AppNavigator, ContactsNavigator, UserNavigator } from './navigators'

// const BipStack = createNativeStackNavigator()
// const BipStackScreen = () => {

//     return (
//         <BipStack.Navigator
//             initialRouteName='BipList'
//             screenOptions={{
//                 headerShown: false,
//             }}
//         >

//             <BipStack.Screen
//                 name='BipList'
//                 children={props => <BipsScreen {...props} />}
//                 // component={BipsScreen}
//                 options={{ title: 'Bips' }}
//             />

//             <BipStack.Screen
//                 name='Bip'
//                 children={props => <BipScreen {...props} />}
//                 // component={BipScreen}
//                 options={{ title: 'Bip' }}
//             />

//             {/* <BipStack.Screen
//                 name='BipMap'
//                 children={props => <MapScreen {...props} />}
//                 // component={MapScreen}
//                 options={{ title: 'Map' }}
//             /> */}

//         </BipStack.Navigator>
//     )
// }


// const AboutStack = createNativeStackNavigator()
// const AboutStackScreen = () => {

//     return (
//         <AboutStack.Navigator
//             initialRouteName='Work'
//             screenOptions={{
//                 headerShown: false,
//             }}
//         >

//             <AboutStack.Screen
//                 name='Work'
//                 children={props => <WorkScreen {...props} />}
//                 // component={WorkScreen}
//                 options={{ title: 'Work' }}
//             />

//             <AboutStack.Screen
//                 name='Play'
//                 children={props => <PlayScreen {...props} />}
//                 // component={PlayScreen}
//                 options={{
//                     title: 'Play',
//                     gestureEnabled: false,
//                 }}
//             />

//         </AboutStack.Navigator>
//     )
// }

const AppStack = createNativeStackNavigator()
const AppStackScreen = () => {

    return (
        <AppStack.Navigator
            initialRouteName='Home'
            screenOptions={{
                headerShown: true,
                header: props => <BugNavBar {...props} />
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
                // children={props => <ContactsNavigator {...props} />}
                component={ContactsNavigator}
                options={{ title: 'Contacts' }}
            />

            <AppStack.Screen
                name='User'
                // children={props => <UserNavigator {...props} />}
                component={UserNavigator}
                options={{ title: 'Profile' }}
            />

            <AppStack.Screen
                name='Feed'
                children={props => <FeedScreen {...props} />}
                // component={FeedScreen}
                options={{ title: 'Feed' }}
            />

            <AppStack.Screen
                name='Bugs'
                children={props => <BugScreen {...props} />}
                // component={BugScreen}
                options={{ title: 'Bugs' }}
            />

            {/* <AppStack.Screen
                name='Mail'
                children={props => <MailScreen {...props} />}
                // component={MailScreen}
                options={{ title: 'Mail' }}
            /> */}
            
            <AppStack.Screen
                name='Work'
                children={props => <WorkScreen {...props} />}
                // component={AboutStackScreen}
                options={{ title: 'Work' }}
            />

            {/* <AppStack.Screen
                name='Play'
                children={props => <PlayScreen {...props} />}
                // component={AboutStackScreen}
                options={{ title: 'Play' }}
            /> */}

            {/* <AppStack.Screen
                name='Bips'
                children={props => <BipStackScreen {...props} />}
                // component={BipStackScreen}
                options={{ title: 'Bips' }}
            /> */}

            {/* <AppStack.Screen
                name='Simple'
                children={props => <SimpleScreen {...props} />}
                // component={SimpleScreen}
                options={{ title: 'Simple' }}
            /> */}

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
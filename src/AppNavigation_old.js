import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import {
    BugScreen,
    FeedScreen,
    HomeScreen,
    WorkScreen,
    ContactsScreen,
    // BipScreen,
    // BipsScreen,
    // MapScreen,
    // MailScreen,
    PlayScreen,
    // SimpleScreen,
} from '@screens'
import { UserNavigator } from './navigators'

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
                name='Bugs'
                component={BugScreen}
                options={{ title: 'Bugs' }}
            />

            <AppStack.Screen
                name='Feed'
                component={FeedScreen}
                options={{ title: 'Feed' }}
            />

            <AppStack.Screen
                name='Home'
                component={HomeScreen}
                options={{ title: 'Home' }}
            />

            <AppStack.Screen
                name='Users'
                component={ContactsScreen}
                options={{ title: 'Users' }}
            />

            <AppStack.Screen
                name='User'
                component={UserNavigator}
                options={{ title: 'Profile' }}
            />
            
            <AppStack.Screen
                name='Work'
                component={WorkScreen}
                options={{ title: 'Work' }}
            />
                
            {/* <AppStack.Screen
                name='Mail'
                children={props => <MailScreen {...props} />}
                // component={MailScreen}
                options={{ title: 'Mail' }}
            /> */}

            <AppStack.Screen
                name='Play'
                // children={props => <PlayScreen {...props} />}
                component={PlayScreen}
                options={{ title: 'Play' }}
            />

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
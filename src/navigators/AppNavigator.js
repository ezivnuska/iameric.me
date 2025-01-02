import {
    // BipScreen,
    // BipsScreen,
    BugScreen,
    UserListScreen,
    FeedScreen,
    HomeScreen,
    // MapScreen,
    // MailScreen,
    PlayScreen,
    Sandbox,
    // SimpleScreen,
    WorkScreen,
} from '@screens'
import { UserNavigator } from '.'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const AppNavigator = () => {

    const AppStack = createNativeStackNavigator()
    
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

            <AppStack.Screen
                name='Users'
                // children={props => <ContactsNavigator {...props} />}
                component={UserListScreen}
                options={{ title: 'Users' }}
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
                options={{
                    title: 'Bugs',
                    // headerShown: true,
                    // header: props => <BugNavBar {...props} />,
                }}
            />

            {/* <AppStack.Screen
                name='Mail'
                children={props => <MailScreen {...props} />}
                // component={MailScreen}
                options={{ title: 'Mail' }}
            /> */}

            <AppStack.Screen
                name='Sandbox'
                // children={props => <ContactsNavigator {...props} />}
                component={Sandbox}
                options={{ title: 'Sandbox' }}
            />
            
            <AppStack.Screen
                name='Work'
                children={props => <WorkScreen {...props} />}
                // component={AboutStackScreen}
                options={{ title: 'Work' }}
            />

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

export default AppNavigator
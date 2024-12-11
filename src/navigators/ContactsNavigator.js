import { ContactScreen, ContactsScreen } from '@screens'
import { NavBar } from './components'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const ContactsNavigator = () => {

    const ContactsStack = createNativeStackNavigator()
    
    return (
        <ContactsStack.Navigator
            initialRouteName='List'
            screenOptions={{
                headerShown: false,
                // headerShown: true,
                // header: props => <NavBar root='Users' {...props} />
            }}
        >
            <ContactsStack.Screen
                name='List'
                component={ContactsScreen}
                options={{ title: 'Users' }}
            />

            <ContactsStack.Screen
                name='Profile'
                // children={props => <ContactScreen {...props} />}
                component={ContactScreen}
                options={{ title: 'Profile' }}
            />

            <ContactsStack.Screen
                name='Images'
                component={ContactScreen}
                // children={props => <ContactScreen {...props} />}
                options={{ title: 'Images' }}
            />

        </ContactsStack.Navigator>
    )
}

export default ContactsNavigator
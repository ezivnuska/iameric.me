import { ContactScreen, ContactsScreen } from '@screens'
import { NavBar } from './components'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const ContactsNavigator = () => {

    const ContactsStack = createNativeStackNavigator()
    
    return (
        <ContactsStack.Navigator
            initialRouteName='Users'
            screenOptions={{
                // headerShown: false,
                headerShown: true,
                header: props => <NavBar root='Users' {...props} />
            }}
        >
            <ContactsStack.Screen
                name='Users'
                component={ContactsScreen}
                options={{ title: 'Users' }}
            />

            <ContactsStack.Screen
                name='Contact'
                // children={props => <ContactNavigator {...props} />}
                component={ContactScreen}
                options={{ title: 'Contact' }}
            />

            <ContactsStack.Screen
                name='Images'
                // component={ContactScreen}
                children={props => <ContactScreen {...props} />}
                options={{ title: 'Images' }}
            />

        </ContactsStack.Navigator>
    )
}

export default ContactsNavigator
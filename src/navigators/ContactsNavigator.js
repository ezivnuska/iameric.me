import { ContactsScreen } from '@screens'
import { Nav } from './components'
import { createNativeStackNavigator } from '@react-navigation/native-stack'


const ContactsNavigator = () => {
    const ContactStack = createNativeStackNavigator()
    return (
        <ContactStack.Navigator
            initialRouteName='Users'
            screenOptions={{
                headerShown: true,
                header: props => <Nav root='Users' {...props} />
            }}
        >
            <ContactStack.Screen
                name='Users'
                component={ContactsScreen}
                options={{ title: 'Users' }}
            />

            <ContactStack.Screen
                name='Images'
                // children={props => <ContactsScreen {...props} />}
                component={ContactsScreen}
                options={{ title: 'Images' }}
            />

            <ContactStack.Screen
                name='Contact'
                // children={props => <ContactsScreen {...props} />}
                component={ContactsScreen}
                options={{ title: 'User' }}
            />

        </ContactStack.Navigator>
    )
}

export default ContactsNavigator
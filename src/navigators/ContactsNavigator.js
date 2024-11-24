import { ContactsScreen } from '@screens'
import { Nav } from '@components'
import { createNativeStackNavigator } from '@react-navigation/native-stack'


const ContactsNavigator = () => {
    const ContactStack = createNativeStackNavigator()
    return (
        <ContactStack.Navigator
            initialRouteName='Contacts'
            screenOptions={{
                headerShown: true,
                header: props => <Nav root='Contacts' {...props} />
            }}
        >
            <ContactStack.Screen
                name='Contacts'
                component={ContactsScreen}
                options={{ title: 'Contacts' }}
            />

            <ContactStack.Screen
                name='Images'
                // children={props => <ContactsScreen {...props} />}
                component={ContactsScreen}
                options={{ title: 'Images' }}
            />

        </ContactStack.Navigator>
    )
}

export default ContactsNavigator
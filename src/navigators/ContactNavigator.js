import { ContactScreen } from '@screens'
import { NavBar } from './components'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const ContactNavigator = () => {

    const ContactStack = createNativeStackNavigator()
    
    return (
        <ContactStack.Navigator
            initialRouteName='Details'
            screenOptions={{
                headerShown: false,
                // headerShown: true,
                // header: props => <NavBar root='List' {...props} />
            }}
        >

            <ContactStack.Screen
                name='Details'
                // or use the children prop instead
                // to pass extra props
                children={props => <ContactScreen {...props} />}
                // children={props => {
                //     console.log('props-->', props)
                //     return <ContactScreen {...props} />
                // }}
                // component={ContactScreen}
                options={{ title: 'Details' }}
            />

            <ContactStack.Screen
                name='Images'
                // component={ContactScreen}
                children={props => <ContactScreen {...props} />}
                options={{ title: 'Images' }}
            />

        </ContactStack.Navigator>
    )
}

export default ContactNavigator
import { UserScreen } from '@screens'
import { NavBar } from './components'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const UserNavigator = () => {

    const UserStack = createNativeStackNavigator()

    return (
        <UserStack.Navigator
            initialRouteName='Profile'
            screenOptions={{
                headerShown: true,
                header: props => <NavBar root='Profile' {...props} />,
            }}
        >

            <UserStack.Screen
                name='Profile'
                // children={props => <UserScreen {...props} />}
                component={UserScreen}
                options={{ title: 'Profile' }}
            />

            <UserStack.Screen
                name='Images'
                // children={props => <UserScreen {...props} />}
                component={UserScreen}
                options={{ title: 'Images' }}
            />

            {/* <UserStack.Screen
                name='Map'
                children={props => <MapScreen {...props} />}
                // component={MapScreen}
                options={{ title: 'Map' }}
            /> */}

        </UserStack.Navigator>
    )
}

export default UserNavigator
import { UserScreen, ImagesScreen } from '@screens'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import UserNavBar from './UserNavBar'

const UserNavigator = () => {

    const UserStack = createNativeStackNavigator()

    return (
        <UserStack.Navigator
            initialRouteName='Profile'
            screenOptions={{
                headerShown: true,
                header: props => <UserNavBar {...props} />,
            }}
        >

            <UserStack.Screen
                name='Profile'
                component={UserScreen}
                options={{ title: 'Profile' }}
            />

            <UserStack.Screen
                name='Images'
                component={ImagesScreen}
                options={{
                    title: 'Images',
                    gestureEnabled: false,// not working, so far, only tested in brave
                }}
            />

            {/* <UserStack.Screen
                    name='Map'
                    component={MapScreen}
                    options={{ title: 'Map' }}
            /> */}

        </UserStack.Navigator>
    )
}

export default UserNavigator
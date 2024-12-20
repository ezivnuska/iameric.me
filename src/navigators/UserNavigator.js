import { ContactScreen } from '@screens'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const UserNavigator = () => {

    const UserStack = createNativeStackNavigator()

    return (
        <UserStack.Navigator
            initialRouteName='Profile'
            screenOptions={{
                headerShown: false,
            }}
        >

            <UserStack.Screen
                name='Profile'
                component={ContactScreen}
                options={{ title: 'Profile' }}
            />

            <UserStack.Screen
                name='Images'
                component={ContactScreen}
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
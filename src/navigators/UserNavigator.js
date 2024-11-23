import {
    ImagesScreen,
    ProfileScreen,
} from '@screens'
import { UserHeader } from '@components'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const UserNavigator = () => {

    const UserStack = createNativeStackNavigator()

    return (
        <UserStack.Navigator
            initialRouteName='Profile'
            screenOptions={{
                headerShown: false,
                // header: ({ route }) => <UserHeader route={route} />,
            }}
        >

            <UserStack.Screen
                name='Profile'
                // children={props => <ProfileScreen {...props} />}
                component={ProfileScreen}
                options={{ title: 'Profile' }}
            />

            <UserStack.Screen
                name='Images'
                // children={props => <ImagesScreen {...props} />}
                component={ImagesScreen}
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
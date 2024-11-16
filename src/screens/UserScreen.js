import React from 'react'
import { Screen } from './components'
import User from '@user'


const UserScreen = ({ route, navigation, ...props }) => (
    <Screen
        secure
        {...props}
    >
        <User
            route={route.name}
            navigate={navigation.navigate}
        />
    </Screen>
)

export default UserScreen
import React from 'react'
import {
    TouchableOpacity,
} from 'react-native'
import { UserHeading } from '.'

const UserListItem = ({ user, onPress }) => {
    console.log('user/', user)
    return (
        <TouchableOpacity
            onPress={() => onPress(user._id)}
            style={{ borderBottomWidth: 1 }}
        >
            <UserHeading user={user} />
        </TouchableOpacity>
    )
}

export default UserListItem
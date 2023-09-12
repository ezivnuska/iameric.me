import React from 'react'
import {
    TouchableOpacity,
} from 'react-native'
import { UserHeading } from '.'

const UserListItem = ({ user, onPress }) => (
    <TouchableOpacity
        onPress={() => onPress(user)}
        style={{ borderBottomWidth: 1 }}
    >
        <UserHeading user={user} />
    </TouchableOpacity>
)

export default UserListItem
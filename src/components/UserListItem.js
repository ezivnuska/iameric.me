import React from 'react'
import {
    TouchableOpacity,
} from 'react-native'
import { UserHeading } from '.'

export default ({ user, onPress }) => (
    <TouchableOpacity
        onPress={() => onPress(user._id)}
        style={{ borderBottomWidth: 1 }}
    >
        <UserHeading user={user} />
    </TouchableOpacity>
)
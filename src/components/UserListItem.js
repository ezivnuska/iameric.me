import React from 'react'
import {
    TouchableOpacity,
} from 'react-native'
import { UserHeading } from '.'
import { navigate } from '../navigation/RootNavigation'

export default ({ user, onPress }) => (
    <TouchableOpacity
        onPress={() => navigate('User', { id: user._id })}
        style={{ borderBottomWidth: 1 }}
    >
        <UserHeading user={user} />
    </TouchableOpacity>
)
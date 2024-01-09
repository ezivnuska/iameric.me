import React from 'react'
import {
    Pressable,
} from 'react-native'
import { UserHeading } from '.'
import { navigate } from '../navigators/RootNavigation'

export default ({ user, onPress }) => (
    <Pressable
        onPress={() => navigate('Vendor', { id: user._id })}
        style={{ borderBottomWidth: 1 }}
    >
        <UserHeading user={user} />
    </Pressable>
)
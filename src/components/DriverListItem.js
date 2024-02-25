import React from 'react'
import {
    Pressable,
} from 'react-native'
import { UserHeading } from '.'
import { navigate } from '../navigation/RootNavigation'

export default ({ user, onPress }) => (
    <Pressable
        onPress={() => navigate('Driver', { id: user._id })}
        style={{ borderBottomWidth: 1 }}
    >
        <UserHeading
            user={user}
            style={{ alignItems: 'center' }}
        />
    </Pressable>
)
import React from 'react'
import { View } from 'react-native'
import { Profile, UserModal } from '.'

const User = () => (
    <View>
        <View style={{ flexGrow: 1 }}>
            <Profile />
        </View>

        <UserModal />
    </View>
)

export default User
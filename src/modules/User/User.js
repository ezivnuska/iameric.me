import React from 'react'
import { View } from 'react-native'
import { Profile, UserModal, useUser } from '.'

const User = () => {

    const { userModal, closeUserModal } = useUser()

    return (
        <View>
            <View style={{ flexGrow: 1 }}>
                <Profile />
            </View>

            <UserModal
                modal={userModal}
                onCancel={closeUserModal}
            />
        </View>
    )
}

export default User
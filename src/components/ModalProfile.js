import React from 'react'
import {
    View,
} from 'react-native'
import {
    UserDetailsShort,
} from '.'
import {
    useModal,
    useUser,
} from '@context'

export default () => {

    const { closeModal } = useModal()
    const { profile } = useUser()
    
    return (
        <View
            style={{
                alignItems: 'center',
            }}
        >
            {profile && (
                <UserDetailsShort
                    userId={profile._id}
                    clear={closeModal}
                />
            )}
        </View>
    )
}
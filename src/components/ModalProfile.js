import React from 'react'
import {
    View,
} from 'react-native'
import {
    UserDetailsShort,
} from '.'
import {
    useAuth,
    useModal,
} from '@context'

export default () => {

    const { closeModal } = useModal()
    const { profile } = useAuth()
    
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
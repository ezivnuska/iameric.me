import React, { useContext } from 'react'
import {
    View,
} from 'react-native'
import {
    CenterVertical,
    IconButton,
} from '.'
import { AppContext, useAuth, useModal, useUser } from '@context'
import { signout } from '@utils/auth'

export default () => {

    const { closeModal } = useModal()
    const { profile, clearUser } = useUser()
    const { signOut } = useAuth()

    const {
        loading,
    } = useContext(AppContext)

    const initSignout = async () => {
        const signedOut = await signout(profile._id)
        if (!signedOut) throw new Error()
        else {
            signOut()
            clearUser()
            closeModal()
            console.log('USER SIGNED OUT')
        }
    }

    return (
        <CenterVertical>
            <View
                style={{
                    marginHorizontal: 10,
                }}
            >
                <IconButton
                    type='primary'
                    label='Sign Out'
                    onPress={initSignout}
                    disabled={loading}
                />
            </View>
        </CenterVertical>
    )
}
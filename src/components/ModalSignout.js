import React, { useContext, useEffect } from 'react'
import {
    View,
} from 'react-native'
import {
    IconButton,
} from '.'
import { AppContext, useAuthorization, useModal, useUser } from '@context'
import { signout } from '@utils/auth'

export default () => {

    const { closeModal } = useModal()
    const { profile, clearUser } = useUser()
    const { status, signOut } = useAuthorization()

    const {
        loading,
    } = useContext(AppContext)

    const initSignout = async () => {
        const signedOut = await signout(profile._id)
        console.log('SIGNEDOUT', signedOut)
        if (!signedOut) throw new Error()
        else {
            signOut()
            clearUser()
            closeModal()
        }
    }

    useEffect(() => {
        console.log('status', status)
    }, [status])

    return (
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
    )
}
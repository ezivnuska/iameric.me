import React from 'react'
import {
    View,
} from 'react-native'
import {
    CenterVertical,
    IconButton,
} from '.'
import {
    useAuth,
} from '@context'
import { signout } from '@utils/auth'

export default () => {

    const { authLoading, authToken, signOut } = useAuth()

    const initSignout = async () => {
        const signedOut = await signout(authToken)
        if (!signedOut) throw new Error()
        else signOut()
    }
    return (
        <IconButton
            type='primary'
            label='Sign Out'
            onPress={initSignout}
            disabled={authLoading}
        />
    )
}
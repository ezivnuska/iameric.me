import React from 'react'
import {
    View,
} from 'react-native'
import {
    CenterVertical,
    IconButton,
} from '.'
import {
    useApp,
    useUser,
} from '@context'
import { signout } from '@utils/auth'

export default () => {

    const { appLoading, signOut, userId } = useApp()
    const { clearUser } = useUser()

    const initSignout = async () => {
        console.log('userId on signout', userId)
        const signedOut = await signout(userId)
        if (!signedOut) throw new Error()
        else {
            clearUser()
            signOut()
        }
    }
    return (
        <IconButton
            type='primary'
            label='Sign Out'
            onPress={initSignout}
            disabled={appLoading}
        />
    )
}
import React from 'react'
import { IconButton } from '@components'
import {
    useApp,
    useModal,
    useUser,
} from '@context'
import { signout } from '@utils/auth'

export default () => {

    const { appLoading, signOut, userId } = useApp()
    const { clearUser } = useUser()
    const { closeModal } = useModal()

    const initSignout = async () => {
        const signedOut = await signout(userId)
        if (!signedOut) throw new Error()
        else {
            clearUser()
            signOut()
            closeModal()
        }
    }
    return (
        <IconButton
            type='primary'
            label='Sign Out'
            onPress={initSignout}
            disabled={appLoading}
            padded
        />
    )
}
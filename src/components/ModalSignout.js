import React from 'react'
import {
    CenterVertical,
    IconButton,
} from '@components'
import {
    useApp,
    useCart,
    useImages,
    useModal,
    useUser,
} from '@context'
import { signout } from '@utils/auth'

export default () => {

    const { appLoading, signOut, userId } = useApp()
    const { clearCart } = useCart()
    const { clearImages } = useImages()
    const { clearUser } = useUser()
    const { closeModal } = useModal()

    const initSignout = async () => {
        const signedOut = await signout(userId)
        if (!signedOut) throw new Error()
        else {
            clearImages()
            clearCart()
            clearUser()
            signOut()
            closeModal()
        }
    }
    return (
        <CenterVertical>
            <IconButton
                type='primary'
                label='Sign Out'
                onPress={initSignout}
                disabled={appLoading}
                padded
            />
        </CenterVertical>
    )
}
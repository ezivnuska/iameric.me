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
    useCart,
    useModal,
    useUser,
} from '@context'
import { signout } from '@utils/auth'

export default () => {

    const { clearCart } = useCart()
    const { closeModal } = useModal()
    const { profile, clearUser } = useUser()
    const { authLoading, signOut } = useAuth()

    const initSignout = async () => {
        const signedOut = await signout(profile._id)
        if (!signedOut) throw new Error()
        else {
            clearCart()
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
                    disabled={authLoading}
                />
            </View>
        </CenterVertical>
    )
}
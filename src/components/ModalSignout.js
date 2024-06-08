import React from 'react'
import { View } from 'react-native'
import {
    IconButton,
} from '@components'
import {
    useApp,
    useCart,
    useImages,
    useModal,
    useOrders,
    useProducts,
} from '@context'
import { signout } from '@utils/auth'
import { navigationRef } from '@navigation/RootNavigation'
import { classes } from '@styles'
import socket from '../socket'

export default () => {

    const {
        appLoading,
        clearUser,
        signOut,
        userId,
    } = useApp()
    const { clearCart } = useCart()
    const { clearImages } = useImages()
    const { closeModal } = useModal()
    const { clearOrders } = useOrders()
    const { clearProducts } = useProducts()

    const initSignout = async () => {
        const idToSignOut = userId
        const signedOut = await signout(idToSignOut)
        if (!signedOut) throw new Error()
        else {
            console.log(`\nemitting user_signed_out with userId: ${idToSignOut} from ModalSignout\n`)
            socket.emit('user_signed_out', idToSignOut)

            clearImages()
            clearCart()
            clearOrders()
            clearProducts()
            signOut()
            closeModal()
            navigationRef.navigate('Start')
            clearUser()
        }
    }
    return (
        <View style={[classes.centerV, classes.paddingH]}>
            <View style={{ width: '100%', maxWidth: 200 }}>
                <IconButton
                    type='primary'
                    label='Sign Out'
                    onPress={initSignout}
                    disabled={appLoading}
                    padded
                />
            </View>
        </View>
    )
}
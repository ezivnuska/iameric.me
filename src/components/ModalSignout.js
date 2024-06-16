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
import { classes } from '@styles'

export default () => {

    const {
        appLoading,
        clearUser,
        signOut,
        socket,
        userId,
    } = useApp()

    const { clearCart } = useCart()
    const { clearImages } = useImages()
    const { closeModal } = useModal()
    const { clearOrders } = useOrders()
    const { clearProducts } = useProducts()

    const initSignout = async () => {
        const user = await signout(userId)
        console.log(`\nsignedOut: ${user}\n`)
        if (!user) throw new Error()
        else {
            console.log(`\nemitting user_signed_out with userId: ${user._id} from ModalSignout\n`)
            socket.emit('user_signed_out', user._id)

            clearImages()
            clearCart()
            clearOrders()
            clearProducts()
            signOut()
            closeModal()
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
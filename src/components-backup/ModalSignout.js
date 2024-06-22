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
import { navigationRef } from '@utils/navigate'

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
        if (!user) throw new Error()
        else {
            clearImages()
            clearCart()
            clearOrders()
            // clearProducts()
            signOut()
            closeModal()
            clearUser()
            socket.emit('user_signed_out', user._id)
            navigationRef.navigate('Start')
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
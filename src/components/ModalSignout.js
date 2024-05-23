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
    useUser,
} from '@context'
import { signout } from '@utils/auth'
import { navigationRef } from '@navigation/RootNavigation'
import { classes } from '@styles'

export default () => {

    const { appLoading, signOut, userId } = useApp()
    const { clearCart } = useCart()
    const { clearImages } = useImages()
    const { clearUser } = useUser()
    const { closeModal } = useModal()
    const { clearOrders } = useOrders()
    const { clearProducts } = useProducts()

    const initSignout = async () => {
        const signedOut = await signout(userId)
        if (!signedOut) throw new Error()
        else {
            clearImages()
            clearCart()
            clearOrders()
            clearProducts()
            clearUser()
            signOut()
            closeModal()
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
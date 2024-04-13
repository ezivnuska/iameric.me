import React from 'react'
import { IconButton } from '.'
import {
    useApp,
    useCart,
    useModal,
} from '@context'

export default () => {

    const { theme } = useApp()
    const { setModal } = useModal()
    const { items } = useCart()

    const getItemCount = () => {
        let count = 0
        items.map(item => count += item.quantity)
        return count
    }

    return items.length ? (
        <IconButton
            type='primary'
            label={getItemCount(items)}
            iconName='cart-outline'
            onPress={() => setModal('CART')}
            padded={true}
            textStyles={{ paddingVertical: 1, color: theme?.colors.buttonPrimaryLabel }}
            styles={{ flexGrow: 0 }}
        />
    ) : null
}
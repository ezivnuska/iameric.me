import React, { useContext } from 'react'
import {
    View,
} from 'react-native'
import {
    IconButton,
} from '.'
import { AppContext } from '../AppContext'
import { useTheme } from 'react-native-paper'

export default props => {

    const theme = useTheme()

    const {
        cart,
        dispatch,
    } = useContext(AppContext)

    const getItemCount = items => {
        let count = 0
        items.map(item => count += item.quantity)
        return count
    }

    return (
        <IconButton
            {...props}
            type='primary'
            label={getItemCount(cart[0].items)}
            iconName='cart-outline'
            onPress={() => dispatch({ type: 'SET_MODAL', modalType: 'CART' })}
            padded={true}
            textStyles={{ paddingVertical: 1, color: theme?.colors.buttonPrimaryLabel }}
            styles={{ flexGrow: 0 }}
        />
    )
}
import React, { useContext } from 'react'
import {
    View,
} from 'react-native'
import {
    IconButton,
} from '.'
import { AppContext } from '../AppContext'
import { useTheme } from 'react-native-paper'

export default () => {

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
        <View
            style={{
                marginHorizontal: 5,
            }}
        >
            <IconButton
                type='primary'
                label={getItemCount(cart[0].items)}
                iconName='cart-outline'
                onPress={() => dispatch({ type: 'SET_MODAL', modalName: 'CART' })}
                padded={true}
                textStyles={{ color: theme?.colors.buttonLabel }}
            />

        </View>
    )
}
import React, { useContext } from 'react'
import {
    IconButton,
    ProductList,
} from '@components'
import {
    Screen,
    ScreenTitle,
} from '.'
import { AppContext } from '../../AppContext'
import { useTheme } from 'react-native-paper'

export default () => {

    const {
        dispatch,
        loading,
    } = useContext(AppContext)

    const theme = useTheme()

    return (
        <Screen
            titleComponent={
                <ScreenTitle title='Products'>
                    <IconButton
                        label='New Product'
                        iconName='add-outline'
                        onPress={() => dispatch({ type: 'SET_MODAL', modalName: 'PRODUCT' })}
                        disabled={loading}
                        alignIcon='right'
                        textStyles={{
                            fontSize: 16,
                            fontWeight: 400,
                            color: theme?.colors.textDefault,
                        }}
                        transparent
                        padded={false}
                    />
                </ScreenTitle>
            }
        >
            <ProductList />
        </Screen>
    )
}
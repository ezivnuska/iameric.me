import React, { useContext } from 'react'
import {
    IconButton,
    ProductModule,
} from '@components'
import {
    Screen,
    ScreenTitle,
} from '.'
import { AppContext } from '../../AppContext'

export default () => {

    const {
        dispatch,
        loading,
    } = useContext(AppContext)

    return (
        <Screen>
            <ScreenTitle title='Products'>
                <IconButton
                    label='New Product'
                    onPress={() => dispatch({ type: 'SET_MODAL', modalName: 'PRODUCT' })}
                    disabled={loading}
                    iconName='add-outline'
                    align='left'
                    style={{ paddingHorizontal: 10, paddingLeft: 10, paddingRight: 10 }}
                    transparent
                />
            </ScreenTitle>
            <ProductModule />
        </Screen>
    )
}
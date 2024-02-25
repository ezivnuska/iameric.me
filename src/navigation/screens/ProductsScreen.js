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
                    iconName='add-outline'
                    onPress={() => dispatch({ type: 'SET_MODAL', modalName: 'PRODUCT' })}
                    disabled={loading}
                    // align='left'
                    transparent
                    style={{
                        paddingHorizontal: 10,
                        paddingLeft: 10,
                        paddingRight: 10,
                    }}
                />
            </ScreenTitle>
            <ProductList />
        </Screen>
    )
}
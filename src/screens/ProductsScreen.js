import React, { useContext } from 'react'
import {
    IconButton,
    ProductList,
} from '@components'
import {
    Screen,
    ScreenTitle,
} from '.'
import { AppContext, useApp, useModal } from '@context'

export default () => {

    const {
        loading,
    } = useContext(AppContext)

    const { theme } = useApp()
    const { setModal } = useModal()

    return (
        <Screen
            titleComponent={
                <ScreenTitle title='Products'>
                    <IconButton
                        label='New Product'
                        iconName='add-outline'
                        onPress={() => setModal('PRODUCT')}
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
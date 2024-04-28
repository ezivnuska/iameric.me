import React from 'react'
import {
    IconButton,
    Products,
} from '@components'
import {
    Screen,
    ScreenTitle,
} from '.'
import {
    ProductsContextProvider,
    useApp,
    useModal,
} from '@context'

export default props => {

    const { theme } = useApp()
    const { setModal } = useModal()

    return (
        <Screen {...props}>
            <ScreenTitle title='Products'>
                <IconButton
                    label='New Product'
                    iconName='add-outline'
                    onPress={() => setModal('PRODUCT')}
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
            <ProductsContextProvider>
                <Products />
            </ProductsContextProvider>
        </Screen>
    )
}
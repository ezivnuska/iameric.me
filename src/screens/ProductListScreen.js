import React from 'react'
import {
    IconButton,
    ProductView,
} from '@components'
import {
    Screen,
    ScreenTitle,
} from '.'
import { AppContext, useApp, useModal } from '@context'

export default () => {

    const { theme } = useApp()
    const { setModal } = useModal()

    const {
        loading,
    } = useContext(AppContext)

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
            <ProductView />
        </Screen>
    )
}
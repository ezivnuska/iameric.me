import React from 'react'
import {
    IconButton,
    ProductView,
} from '@components'
import {
    Screen,
    ScreenTitle,
} from '.'
import {
    useApp,
    useModal,
} from '@context'

export default () => {

    const { theme } = useApp()
    const { data, setModal } = useModal()

    return (
        <Screen
            titleComponent={
                <ScreenTitle title='Products'>
                    <IconButton
                        label='New Product'
                        iconName='add-outline'
                        onPress={() => setModal('PRODUCT', data)}
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
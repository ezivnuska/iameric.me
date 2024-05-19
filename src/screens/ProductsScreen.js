import React from 'react'
import {
    IconButton,
    Products,
    ScreenContent,
    TitleBar,
} from '@components'
import { Screen } from '.'
import { useModal } from '@context'

export default props => {
    const { setModal } = useModal()
    return (
        <Screen {...props}>
            <TitleBar title='Products'>
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
            </TitleBar>
            <ScreenContent>
                <Products />
            </ScreenContent>
        </Screen>
    )
}
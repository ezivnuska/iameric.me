import React from 'react'
import { View } from 'react-native'
import {
    IconButton,
    Products,
    TitleBar,
    Screen,
} from '@components'
import {
    useApp,
    useModal,
} from '@context'
import { classes } from '@styles'

export default props => {
    const { theme } = useApp()
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

            <View style={classes.paddingH}>
                <Products />
            </View>
        </Screen>
    )
}
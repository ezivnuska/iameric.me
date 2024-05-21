import React from 'react'
import { View } from 'react-native'
import {
    Forum,
    IconButton,
    TitleBar,
    Screen,
} from '@components'
import { useModal } from '@context'
import { classes } from '@styles'

export default props => {
    const { setModal } = useModal()
    return (
        <Screen {...props}>
            <TitleBar title='Forum'>
                <IconButton
                    label='Comment'
                    iconName='add-outline'
                    onPress={() => setModal('FEEDBACK')}
                    padded={true}
                    transparent
                />
            </TitleBar>
            <View style={classes.paddingH}>
                <Forum />
            </View>
        </Screen>
    )
}
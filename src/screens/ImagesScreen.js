import React from 'react'
import { View } from 'react-native'
import {
    Images,
    TitleBar,
    Screen,
} from '@components'
import { classes } from '@styles'

export default props => (
    <Screen {...props}>
        <TitleBar title='Images' />
        <View style={classes.paddingH}>
            <Images />
        </View>
    </Screen>
)
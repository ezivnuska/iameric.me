import React from 'react'
import { View } from 'react-native'
import {
    TitleBar,
    Screen,
    Vendors,
} from '@components'
import { classes } from '@styles'

export default props => (
    <Screen {...props}>
        <TitleBar title='Vendors' />
        <View style={classes.paddingH}>
            <Vendors />
        </View>
    </Screen>
)
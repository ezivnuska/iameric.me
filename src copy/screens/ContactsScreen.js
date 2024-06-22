import React from 'react'
import { View } from 'react-native'
import {
    Contacts,
    TitleBar,
    Screen,
} from '@components'
import { classes } from '@styles'

export default props => (
    <Screen {...props}>
        <TitleBar title='Contacts' />
        <View style={classes.paddingH}>
            <Contacts />
        </View>
    </Screen>
)
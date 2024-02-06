import React from 'react'
import {
    EntryModule,
    ScreenTitle,
    Screen,
} from '@components'

export default ({ navigation }) => (
    <Screen navigation={navigation}>
        <ScreenTitle title='Forum' />
        <EntryModule />
    </Screen>
)
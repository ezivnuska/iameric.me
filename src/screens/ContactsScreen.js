import React from 'react'
import {
    Contacts,
    ScreenContent,
    TitleBar,
} from '@components'
import { Screen } from '.'

export default props => (
    <Screen {...props}>
        <TitleBar title='Contacts' />
        <ScreenContent>
            <Contacts />
        </ScreenContent>
    </Screen>
)
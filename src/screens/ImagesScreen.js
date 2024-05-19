import React from 'react'
import { Screen } from '.'
import {
    Images,
    ScreenContent,
    TitleBar,
} from '@components'

export default props => (
    <Screen {...props}>
        <TitleBar title='Images' />
        <ScreenContent>
            <Images />
        </ScreenContent>
    </Screen>
)
import React from 'react'
import {
    Orders,
} from '@components'
import {
    Screen,
    ScreenTitle,
} from '.'

export default props => (
    <Screen {...props}>
        <ScreenTitle title='Orders' />
        <Orders />
    </Screen>
)
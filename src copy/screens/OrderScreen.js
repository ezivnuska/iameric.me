import React from 'react'
import {
    Orders,
    Screen,
    TitleBar,
} from '@components'

export default props => (
    <Screen {...props}>
        <TitleBar title='Orders' />
        <Orders />
    </Screen>
)
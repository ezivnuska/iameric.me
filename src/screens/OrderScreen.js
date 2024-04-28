import React from 'react'
import {
    OrderList,
} from '@components'
import {
    Screen,
    ScreenTitle,
} from '.'

export default props => (
    <Screen {...props}>
        <ScreenTitle title='Orders' />
        <OrderList />
    </Screen>
)
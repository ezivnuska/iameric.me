import React from 'react'
import {
    OrderList,
} from '@components'
import {
    Screen,
    ScreenTitle,
} from '.'

export default () => (
    <Screen>
        <ScreenTitle title='Orders' />
        <OrderList />
    </Screen>
)
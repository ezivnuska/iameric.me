import React from 'react'
import {
    OrderList,
    Screen,
    ScreenTitle,
} from '@components'

export default () => (
    <Screen>
        <ScreenTitle title='Orders' />
        <OrderList />
    </Screen>
)
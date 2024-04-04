import React from 'react'
import {
    OrderList,
} from '@components'
import {
    Screen,
    ScreenTitle,
} from '.'

export default () => (
    <Screen
        titleComponent={<ScreenTitle title='Orders' />}
    >
        <OrderList />
    </Screen>
)
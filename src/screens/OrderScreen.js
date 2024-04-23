import React from 'react'
import {
    OrderList,
} from '@components'
import {
    Screen,
    ScreenTitle,
} from '.'

export default props => (
    <Screen
        titleComponent={<ScreenTitle title='Orders' />}
        {...props}
    >
        <OrderList />
    </Screen>
)
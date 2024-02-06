import React from 'react'
import {
    OrderList,
    Screen,
    ScreenTitle,
} from '@components'

export default ({ navigation }) => (
    <Screen navigation={navigation}>
        <ScreenTitle title='Orders' />
        <OrderList />
    </Screen>
)
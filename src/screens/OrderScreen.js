import React from 'react'
import {
    OrderList,
    Screen,
} from '@components'

export default ({ navigation }) => (
    <Screen navigation={navigation}>
        <OrderList />
    </Screen>
)
import React from 'react'
import {
    OrderList,
    SecureScreen,
} from '@components'

export default ({ navigation }) => (
    <SecureScreen navigation={navigation}>
        <OrderList />
    </SecureScreen>
)
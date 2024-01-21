import React from 'react'

import {
    OrderList,
    SecureScreen,
} from '@components'

export default ({ navigation, route }) => (
    <SecureScreen navigation={navigation}>
        <OrderList />
    </SecureScreen>
)
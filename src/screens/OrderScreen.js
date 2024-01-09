import React from 'react'

import {
    OrderModule,
    SecureScreen,
} from '@components'

export default ({ navigation, route }) => (
    <SecureScreen navigation={navigation}>
        <OrderModule />
    </SecureScreen>
)
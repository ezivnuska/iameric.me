import React from 'react'
import {
    Screen,
    ScreenTitle,
    UserModule,
} from '@components'

export default ({ title, ...props }) => (
    <Screen>
        <ScreenTitle title={title} />
        <UserModule {...props} />
    </Screen>
)
import React from 'react'
import {
    UserModule,
} from '@components'
import {
    Screen,
} from '.'

export default ({ title, ...props }) => (
    <Screen title={title}>
        <UserModule {...props} />
    </Screen>
)
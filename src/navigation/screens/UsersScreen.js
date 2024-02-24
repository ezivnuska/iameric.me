import React from 'react'
import {
    UserModule,
} from '@components'
import {
    Screen,
} from '.'

export default ({ ...props }) => (
    <Screen>
        <UserModule {...props} />
    </Screen>
)
import React from 'react'
import {
    UserModule,
} from '@components'
import {
    Screen,
    ScreenTitle,
} from '.'

export default ({ ...props }) => (
    <Screen>
        <ScreenTitle title='Users' />
        <UserModule {...props} />
    </Screen>
)
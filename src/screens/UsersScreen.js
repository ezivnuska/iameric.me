import React from 'react'
import {
    UserModule,
} from '@components'
import {
    Screen,
    ScreenTitle,
} from '.'

export default props => {
    return (
        <Screen {...props}>
            <ScreenTitle title='Users' />
            <UserModule {...props} />
        </Screen>
    )
}
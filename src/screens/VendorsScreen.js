import React from 'react'
import {
    Vendors,
} from '@components'
import {
    Screen,
} from '.'

export default props => (
    <Screen {...props}>
        <Vendors {...props} />
    </Screen>
)
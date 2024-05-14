import React from 'react'
import {
    Vendors,
} from '@components'
import {
    Screen,
} from '.'

export default props => (
    <Screen secure={false} {...props}>
        <Vendors {...props} />
    </Screen>
)
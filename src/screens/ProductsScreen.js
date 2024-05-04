import React from 'react'
import { Products } from '@components'
import { Screen } from '.'

export default props => (
    <Screen {...props}>
        <Products />
    </Screen>
)
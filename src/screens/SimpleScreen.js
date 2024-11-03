import React from 'react'
import { Screen } from './components'
import { Simple } from '@modules'

const SimpleScreen = props => (
    <Screen {...props}>
        <Simple />
    </Screen>
)

export default SimpleScreen
import React from 'react'
import { Screen } from './components'
import { Contacts } from '@modules'

export default props => (
    <Screen secure {...props}>
        <Contacts {...props} />
    </Screen>
)
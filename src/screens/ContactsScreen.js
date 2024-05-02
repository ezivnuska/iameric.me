import React from 'react'
import { ContactsView } from '@components'
import { Screen } from '.'

export default props => (
    <Screen {...props}>
        <ContactsView />
    </Screen>
)
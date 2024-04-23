import React from 'react'
import {
    ContactsView,
} from '@components'
import {
    Screen,
    ScreenTitle,
} from '.'

export default props => (
    <Screen
        titleComponent={<ScreenTitle title='Contacts' />}
        {...props}
    >
        <ContactsView />
    </Screen>
)
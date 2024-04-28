import React from 'react'
import {
    ContactsView,
} from '@components'
import {
    Screen,
    ScreenTitle,
} from '.'
import {
    ContactContextProvider,
} from '@context'

export default props => (
    <Screen {...props}>
        <ContactContextProvider>
            <ScreenTitle title='Contacts' />
            <ContactsView />
        </ContactContextProvider>
    </Screen>
)
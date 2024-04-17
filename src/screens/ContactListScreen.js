import React from 'react'
import {
    ContactsView,
} from '@components'
import {
    Screen,
    ScreenTitle,
} from '.'
import { ContactContextProvider } from '../context/ContactContext'

export default () => (
    <Screen
        titleComponent={<ScreenTitle title='Contacts' />}
    >
        <ContactContextProvider>
            <ContactsView />
        </ContactContextProvider>
    </Screen>
)
import React from 'react'
import {
    ContactView,
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
            <ContactView />
        </ContactContextProvider>
    </Screen>
)
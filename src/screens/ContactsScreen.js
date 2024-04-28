import React from 'react'
import {
    ContactModal,
    ContactsView,
} from '@components'
import {
    Screen,
} from '.'
import {
    ContactContextProvider,
} from '@context'

export default props => (
    <Screen {...props}>
        <ContactContextProvider>
            <ContactsView />
            <ContactModal />
        </ContactContextProvider>
    </Screen>
)
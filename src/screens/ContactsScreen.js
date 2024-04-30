import React from 'react'
import { ContactsView } from '@components'
import { Screen } from '.'
import { ContactContextProvider } from '@context'

export default props => (
    <Screen {...props}>
        <ContactContextProvider>
            <ContactsView />
        </ContactContextProvider>
    </Screen>
)
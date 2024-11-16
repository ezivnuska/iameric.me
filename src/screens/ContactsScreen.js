import React from 'react'
import { Screen } from './components'
import Contacts, { ContactsContextProvider } from '@contacts'

const ContactsScreen = props => (
    <Screen
        {...props}
        secure
    >
        <ContactsContextProvider>
            <Contacts {...props} />
        </ContactsContextProvider>
    </Screen>
)

export default ContactsScreen
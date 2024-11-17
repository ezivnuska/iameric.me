import React from 'react'
import { Screen } from './components'
import Contacts from '@contacts'

const ContactsScreen = props => (
    <Screen
        {...props}
        secure
    >
        <Contacts {...props} />
    </Screen>
)

export default ContactsScreen
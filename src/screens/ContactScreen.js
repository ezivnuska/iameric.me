import React from 'react'
import { Screen } from './components'
import { Contact } from '@modules'
import { ContactContextProvider } from '@contact'

const ContactScreen = props => (
    <Screen {...props} secure>
        <ContactContextProvider username={props.route.params.username}>
            <Contact {...props} />
        </ContactContextProvider>
    </Screen>
)

export default ContactScreen
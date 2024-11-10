import React from 'react'
import { View } from 'react-native'
import { LoadingView } from '@components'
import { ContactListItem, ContactsHeader } from './components'
import { useApp } from '@app'
import { useContacts } from '@contacts'

export default () => {

    const { user } = useApp()
    const {
        contacts,
        contactsLoading,
    } = useContacts()

    return (
        <View>
            <ContactsHeader />
            {contacts.map((contact, index) => {
                if (user && user._id === contact._id) return null
                return contactsLoading
                    ? <LoadingView loading='Loading contacts...' />
                    : <ContactListItem item={contact} key={`contact-${index}`} />
            })}
        </View>
    )
}
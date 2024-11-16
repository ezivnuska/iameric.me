import React, { useEffect } from 'react'
import { View } from 'react-native'
import { ActivityIndicator, Heading } from '@components'
import { ContactListItem, ContactsHeader } from './components'
import { useUser } from '@user'
import { useContacts } from '@contacts'

const Contacts = props => {

    const { user } = useUser()
    const {
        contacts,
        contactsLoading,
    } = useContacts()

    return !contactsLoading ? (
        <View
            {...props}
            style={{ flex: 1 }}
        >
            <View>
                <Heading
                    title='Contacts'
                />

                {contacts.map((contact, index) => {
                    if (user && user._id !== contact._id) return <ContactListItem item={contact} key={`contact-${index}`} />
                    else return null
                })}
            </View>
        </View>
    ) : <ActivityIndicator size='medium' />
}

export default Contacts
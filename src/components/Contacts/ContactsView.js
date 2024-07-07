import React from 'react'
import { View } from 'react-native'
import { LoadingView } from '@components'
import { ContactListItem } from './components'
import { useApp } from '@app'
import { useContacts } from '@contacts'

export default () => {

    const { user } = useApp()
    const {
        contacts,
        contactsLoading,
    } = useContacts()

    if (contactsLoading) return <LoadingView loading='Loading contacts...' />

    return (
        <View>
            {contacts.map((contact, index) => {
                if (user && user._id === contact._id) return null
                return (
                    <ContactListItem
                        item={contact}
                        onPress={() => console.log(`pressed ${contact.username}`)}
                        key={`contact-${index}`}
                    />
                )
            })}
        </View>
    )
}
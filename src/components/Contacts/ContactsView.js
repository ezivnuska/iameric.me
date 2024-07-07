import React from 'react'
import { View } from 'react-native'
import { LoadingView } from '@components'
import { ContactListItem } from './components'
import { useApp } from '@app'

export default ContactsView =({ contacts, loading }) => {

    const { user } = useApp()

    if (loading) return <LoadingView loading='Loading contacts...' />

    return contacts && (
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
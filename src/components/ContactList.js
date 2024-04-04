import React, { useContext } from 'react'
import {
    View,
} from 'react-native'
import { ThemedText } from '@components'
import { ContactContext } from '@context'

export default ContactList = () => {
    const {
        state,
    } = useContext(ContactContext)

    const { contacts } = state

    const renderContacts = () => (
        <>
            {contacts.map((contact, index) => (
                <View key={`contact-${index}`}>
                    <ThemedText>{contact.username}</ThemedText>
                </View>
            ))}
        </>
    )

    return (
        <View>
            {renderContacts()}
        </View>
    )
}
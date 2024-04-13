import React from 'react'
import { View } from 'react-native'
import { ThemedText } from '@components'
import { useContacts } from '@context'

export default ContactList = () => {

    const { contacts } = useContacts()

    const renderContacts = () => contacts.map((contact, index) => (
        <View key={`contact-${index}`}>
            <ThemedText>{contact.username}</ThemedText>
        </View>
    ))

    return (
        <View>
            {renderContacts()}
        </View>
    )
}
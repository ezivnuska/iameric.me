import React from 'react'
import { View } from 'react-native'
import { ContactListItem } from './components'

const ContactsListView = ({ contacts, onPress }) => (
    <View style={{ flex: 1, gap: 10 }}>
        {contacts.map((contact, index) => (
            <ContactListItem
                onPress={onPress}
                key={`contact-${index}`}
                item={contact}
            />
        ))}
    </View>
)

export default ContactsListView
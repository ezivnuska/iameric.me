import React from 'react'
import { View } from 'react-native'
import { LoadingView } from '@components'
import { ContactListItem } from './components'
import { useApp } from '@app'
import { useContacts } from '@contacts'
import { navigate } from '@utils/navigation'

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
                        key={`contact-${index}`}
                        onPress={() => navigate('Contact', { screen: 'Details', params: { username: contact.username } })}
                    />
                )
            })}
        </View>
    )
}
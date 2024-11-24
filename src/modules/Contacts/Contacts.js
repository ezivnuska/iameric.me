import React, { useEffect } from 'react'
import { View } from 'react-native'
import { ActivityIndicator, ThemedText } from '@components'
import { ContactListItem } from './components'
import { useUser } from '@user'
import { useContacts } from '@contacts'

const Contacts = ({ navigation }) => {

    const {
        contacts,
        contactsLoading,
        contactsLoaded,
        initContacts,
    } = useContacts()

    const { user } = useUser()

    const renderContacts = () => {
        const array = contacts.filter(contact => contact._id !== user._id)
        return array.length ? array.map((c, i) => (
            <ContactListItem
                onPress={username => navigation.navigate('Contact', { username })}
                key={`contact-${i}`}
                item={c}
            />
        )) : <ThemedText>No users to show.</ThemedText>
    }

    useEffect(() => {
        if (!contactsLoaded && !contactsLoading) {
            initContacts()
        }
    }, [])

    if (contactsLoading) return <ActivityIndicator size='medium' />

    return (
        <View style={{ flex: 1, gap: 10 }}>

            {renderContacts()}

        </View>
    )
}

export default Contacts
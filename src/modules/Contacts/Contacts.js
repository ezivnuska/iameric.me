import React, { useEffect } from 'react'
import { View } from 'react-native'
import { ActivityIndicator, DefaultText } from '@components'
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

    const renderContacts = () => (
        <View style={{ flex: 1, gap: 10 }}>
            {
                contacts.length
                    ? contacts.map((contact, index) => contact._id !== user._id
                        ? (
                            <ContactListItem
                                onPress={username => navigation.navigate('Contact', { username })}
                                key={`contact-${index}`}
                                item={contact}
                            />
                        )
                        : null
                    )
                    : <DefaultText>No users to show.</DefaultText>
            }
        </View>
    )

    useEffect(() => {
        if (!contactsLoaded && !contactsLoading) {
            initContacts()
        }
    }, [])

    return contactsLoading
        ? <ActivityIndicator size='medium' />
        : (
            <View style={{ flex: 1 }}>
                {renderContacts()}
            </View>
        )
}

export default Contacts
import React, { useEffect } from 'react'
import { View } from 'react-native'
import { ActivityIndicator, ThemedText } from '@components'
import { ContactListItem } from './components'
import { useUser } from '@user'
import { useContacts } from '@contacts'

const Contacts = props => {

    const {
        contacts,
        contactsLoading,
        contactsLoaded,
        initLoading,
    } = useContacts()

    const { user } = useUser()

    useEffect(() => {
        if (!contactsLoaded && !contactsLoading) {
            initLoading()
        }
    }, [])

    return (
        <View {...props} style={{ flex: 1 }}>

            {(!contactsLoaded || contactsLoading)
                ? <ActivityIndicator size='medium' />
                : (
                    <View style={{ gap: 10 }}>

                        {contacts.length ? contacts.map((contact, index) => {
                            if (user && user._id !== contact._id) {
                                return (
                                    <ContactListItem
                                        key={`contact-${index}`}
                                        item={contact}
                                    />
                                )
                            }
                            else return null
                        }) : <ThemedText>No contacts to show</ThemedText>}

                    </View>
            )}

        </View>
    )
}

export default Contacts